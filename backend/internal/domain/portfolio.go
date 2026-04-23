package domain

import "time"

// Portfolio adalah struct utama — merepresentasikan tabel di database
type Portfolio struct {
    ID          uint      `json:"id" gorm:"primaryKey;autoIncrement"`
    Title       string    `json:"title" gorm:"not null"`
    Description string    `json:"description"`
    ImageURL    string    `json:"image_url"`
    ProjectURL  string    `json:"project_url"`
    GithubURL   string    `json:"github_url"`
    TechStack   string    `json:"tech_stack"`   // contoh: "Go, React, MySQL"
    Category    string    `json:"category"`     // contoh: "Web", "Mobile"
    IsFeatured  bool      `json:"is_featured" gorm:"default:false"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}

// PortfolioRepository adalah "kontrak" — interface yang harus diimplementasi repository
type PortfolioRepository interface {
    FindAll() ([]Portfolio, error)
    FindByID(id uint) (*Portfolio, error)
    Create(portfolio *Portfolio) error
    Update(portfolio *Portfolio) error
    Delete(id uint) error
}

// PortfolioUsecase adalah "kontrak" untuk usecase
type PortfolioUsecase interface {
    GetAll() ([]Portfolio, error)
    GetByID(id uint) (*Portfolio, error)
    Create(portfolio *Portfolio) error
    Update(portfolio *Portfolio) error
    Delete(id uint) error
}