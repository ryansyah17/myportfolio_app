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
    db  := database.Connect(cfg.DBConnectionString())

    // Auto migrate semua tabel
    db.AutoMigrate(
        &domain.Portfolio{},
        &domain.User{},
    )

    // ── Dependency Injection ──────────────────────────────
    // Portfolio
    portfolioRepo    := repository.NewPortfolioRepository(db)
    portfolioUsecase := usecase.NewPortfolioUsecase(portfolioRepo)
    portfolioHandler := handler.NewPortfolioHandler(portfolioUsecase)

    // Auth
    userRepo    := repository.NewUserRepository(db)
    authUsecase := usecase.NewAuthUsecase(userRepo)
    authHandler := handler.NewAuthHandler(authUsecase)
    // ─────────────────────────────────────────────────────

    r := gin.Default()

    // CORS
    r.Use(func(c *gin.Context) {
        c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
        c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
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
    }

    fmt.Printf("🚀 Server berjalan di http://localhost:%s\n", cfg.AppPort)
    r.Run(":" + cfg.AppPort)
}