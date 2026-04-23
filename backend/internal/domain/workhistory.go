package domain

import "time"

type WorkHistory struct {
    ID          uint      `json:"id" gorm:"primaryKey;autoIncrement"`
    Company     string    `json:"company" gorm:"not null"`
    Position    string    `json:"position" gorm:"not null"`
    StartDate   string    `json:"start_date"`
    EndDate     string    `json:"end_date"`
    IsCurrent   bool      `json:"is_current" gorm:"default:false"`
    Description string    `json:"description"`
    LogoURL     string    `json:"logo_url"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}

type WorkHistoryRepository interface {
    FindAll() ([]WorkHistory, error)
    FindByID(id uint) (*WorkHistory, error)
    Create(w *WorkHistory) error
    Update(w *WorkHistory) error
    Delete(id uint) error
}

type WorkHistoryUsecase interface {
    GetAll() ([]WorkHistory, error)
    GetByID(id uint) (*WorkHistory, error)
    Create(w *WorkHistory) error
    Update(w *WorkHistory) error
    Delete(id uint) error
}