package main

import (
	"fmt"
	"log"

	"portofolio-backend/config"
	"portofolio-backend/internal/domain"
	"portofolio-backend/internal/handler"
	"portofolio-backend/internal/middleware"
	"portofolio-backend/internal/repository"
	"portofolio-backend/internal/usecase"
	"portofolio-backend/pkg/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	cfg := config.Load()
	db := database.Connect(cfg.DBConnectionString())

	// Auto migrate semua tabel
	db.AutoMigrate(
		&domain.Portfolio{},
		&domain.User{},
		&domain.Education{},
		&domain.WorkHistory{},
		&domain.Blog{},
		&domain.Contact{},
	)

	// ── Dependency Injection ──────────────────────────────
	// Portfolio
	portfolioRepo := repository.NewPortfolioRepository(db)
	portfolioUsecase := usecase.NewPortfolioUsecase(portfolioRepo)
	portfolioHandler := handler.NewPortfolioHandler(portfolioUsecase)

	// Auth
	userRepo := repository.NewUserRepository(db)
	authUsecase := usecase.NewAuthUsecase(userRepo)
	authHandler := handler.NewAuthHandler(authUsecase)

	// ── Education ──────────────────────────────────────
	educationRepo := repository.NewEducationRepository(db)
	educationUsecase := usecase.NewEducationUsecase(educationRepo)
	educationHandler := handler.NewEducationHandler(educationUsecase)

	// ── Work History ───────────────────────────────────
	workHistoryRepo := repository.NewWorkHistoryRepository(db)
	workHistoryUsecase := usecase.NewWorkHistoryUsecase(workHistoryRepo)
	workHandler := handler.NewWorkHistoryHandler(workHistoryUsecase)

	// ── Blog ───────────────────────────────────────────
	blogRepo := repository.NewBlogRepository(db)
	blogUsecase := usecase.NewBlogUsecase(blogRepo)
	blogHandler := handler.NewBlogHandler(blogUsecase)

	// ── Contact ────────────────────────────────────────
	contactRepo := repository.NewContactRepository(db)
	contactUsecase := usecase.NewContactUsecase(contactRepo)
	contactHandler := handler.NewContactHandler(contactUsecase)
	// ─────────────────────────────────────────────────────

	r := gin.Default()

	// CORS
	// Ganti bagian CORS middleware dengan ini:
	r.Use(func(c *gin.Context) {
		allowedOrigins := []string{
			"http://localhost:5173",
			"http://localhost:3000",
		}

		origin := c.Request.Header.Get("Origin")
		for _, allowed := range allowedOrigins {
			if origin == allowed {
				c.Header("Access-Control-Allow-Origin", origin)
				break
			}
		}

		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Max-Age", "86400")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	api := r.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{"message": "Pong! 🚀"})
		})

		// ── Auth routes (public) ──
		auth := api.Group("/auth")
		{
			auth.POST("/login", authHandler.Login)
			auth.POST("/register", authHandler.Register)
			auth.GET("/me", middleware.AuthMiddleware(), authHandler.Me)
		}

		// ── Portfolio routes ──
		portfolios := api.Group("/portfolios")
		{
			// GET boleh diakses siapa saja (public)
			portfolios.GET("", portfolioHandler.GetAll)
			portfolios.GET("/:id", portfolioHandler.GetByID)

			// POST, PUT, DELETE hanya admin (butuh token)
			portfolios.Use(middleware.AuthMiddleware())
			portfolios.POST("", portfolioHandler.Create)
			portfolios.PUT("/:id", portfolioHandler.Update)
			portfolios.DELETE("/:id", portfolioHandler.Delete)
		}

		// Education
		education := api.Group("/education")
		{
			education.GET("", educationHandler.GetAll)
			education.GET("/:id", educationHandler.GetByID)
			education.Use(middleware.AuthMiddleware())
			education.POST("", educationHandler.Create)
			education.PUT("/:id", educationHandler.Update)
			education.DELETE("/:id", educationHandler.Delete)
		}

		// Work History
		work := api.Group("/work")
		{
			work.GET("", workHandler.GetAll)
			work.GET("/:id", workHandler.GetByID)
			work.Use(middleware.AuthMiddleware())
			work.POST("", workHandler.Create)
			work.PUT("/:id", workHandler.Update)
			work.DELETE("/:id", workHandler.Delete)
		}

		// Blog
		blogs := api.Group("/blogs")
		{
			blogs.GET("", blogHandler.GetAll)
			blogs.GET("/slug/:slug", blogHandler.GetBySlug)
			blogs.GET("/:id", blogHandler.GetByID)
			blogs.Use(middleware.AuthMiddleware())
			blogs.POST("", blogHandler.Create)
			blogs.PUT("/:id", blogHandler.Update)
			blogs.DELETE("/:id", blogHandler.Delete)
		}

		// Contact
		contacts := api.Group("/contacts")
		{
			contacts.POST("", contactHandler.Send) // public — siapa saja bisa kirim
			contacts.Use(middleware.AuthMiddleware())
			contacts.GET("", contactHandler.GetAll)
			contacts.PUT("/:id/read", contactHandler.MarkAsRead)
			contacts.DELETE("/:id", contactHandler.Delete)
		}
	}

	fmt.Printf("🚀 Server berjalan di http://localhost:%s\n", cfg.AppPort)
	r.Run(":" + cfg.AppPort)
}
