package domain

import "time"

type Contact struct {
    ID        uint      `json:"id" gorm:"primaryKey;autoIncrement"`
    Name      string    `json:"name" gorm:"not null"`
    Email     string    `json:"email" gorm:"not null"`
    Subject   string    `json:"subject"`
    Message   string    `json:"message" gorm:"type:text;not null"`
    IsRead    bool      `json:"is_read" gorm:"default:false"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}

type ContactRepository interface {
    FindAll() ([]Contact, error)
    FindByID(id uint) (*Contact, error)
    Create(c *Contact) error
    MarkAsRead(id uint) error
    Delete(id uint) error
}

type ContactUsecase interface {
    GetAll() ([]Contact, error)
    GetByID(id uint) (*Contact, error)
    Send(c *Contact) error
    MarkAsRead(id uint) error
    Delete(id uint) error
}