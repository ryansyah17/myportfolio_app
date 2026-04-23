package main

import (
	"fmt"
	"log"

	"portofolio-backend/config"
	"portofolio-backend/internal/domain"
	"portofolio-backend/internal/handler"
	"portofolio-backend/internal/repository"
	"portofolio-backend/internal/usecase"
	"portofolio-backend/pkg/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
    // 1. Load .env
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }

    // 2. Load config
    cfg := config.Load()

    // 3. Koneksi database
    db := database.Connect(cfg.DBConnectionString())

    // 4. Auto migrate — otomatis buat tabel dari struct
    db.AutoMigrate(&domain.Portfolio{})

    // 5. Inisialisasi layer (Dependency Injection manual)
    portfolioRepo    := repository.NewPortfolioRepository(db)
    portfolioUsecase := usecase.NewPortfolioUsecase(portfolioRepo)
    portfolioHandler := handler.NewPortfolioHandler(portfolioUsecase)

    // 6. Setup router
    r := gin.Default()

    // CORS — agar React bisa akses API
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

    // 7. Routes
    api := r.Group("/api")
    {
        api.GET("/ping", func(c *gin.Context) {
            c.JSON(200, gin.H{"message": "Pong! 🚀"})
        })

        // Portfolio routes
        portfolios := api.Group("/portfolios")
        {
            portfolios.GET("", portfolioHandler.GetAll)
            portfolios.GET("/:id", portfolioHandler.GetByID)
            portfolios.POST("", portfolioHandler.Create)
            portfolios.PUT("/:id", portfolioHandler.Update)
            portfolios.DELETE("/:id", portfolioHandler.Delete)
        }
    }

    fmt.Printf("🚀 Server berjalan di http://localhost:%s\n", cfg.AppPort)
    r.Run(":" + cfg.AppPort)
}