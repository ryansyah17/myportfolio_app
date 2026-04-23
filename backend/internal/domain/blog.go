package domain

import "time"

type Blog struct {
    ID          uint      `json:"id" gorm:"primaryKey;autoIncrement"`
    Title       string    `json:"title" gorm:"not null"`
    Slug        string `json:"slug" gorm:"type:varchar(255);uniqueIndex;not null"`
    Content     string    `json:"content" gorm:"type:longtext"`
    Excerpt     string    `json:"excerpt"`
    ImageURL    string    `json:"image_url"`
    Category    string    `json:"category"`
    IsPublished bool      `json:"is_published" gorm:"default:false"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}

type BlogRepository interface {
    FindAll(onlyPublished bool) ([]Blog, error)
    FindBySlug(slug string) (*Blog, error)
    FindByID(id uint) (*Blog, error)
    Create(b *Blog) error
    Update(b *Blog) error
    Delete(id uint) error
}

type BlogUsecase interface {
    GetAll(onlyPublished bool) ([]Blog, error)
    GetBySlug(slug string) (*Blog, error)
    GetByID(id uint) (*Blog, error)
    Create(b *Blog) error
    Update(b *Blog) error
    Delete(id uint) error
}