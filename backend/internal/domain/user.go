package domain

import "time"

type User struct {
    ID        uint      `json:"id" gorm:"primaryKey;autoIncrement"`
    Name      string    `json:"name" gorm:"type:varchar(100);not null"`
    Email     string    `json:"email" gorm:"type:varchar(255);uniqueIndex;not null"`
    Password  string    `json:"-" gorm:"type:varchar(255);not null"`
    Role      string    `json:"role" gorm:"type:varchar(50);default:admin"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}

// Request & Response structs — untuk validasi input
type LoginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=6"`
}

type RegisterRequest struct {
    Name     string `json:"name" binding:"required"`
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=6"`
}

type AuthResponse struct {
    Token string `json:"token"`
    User  User   `json:"user"`
}

type UserRepository interface {
    FindByEmail(email string) (*User, error)
    FindByID(id uint) (*User, error)
    Create(user *User) error
}

type AuthUsecase interface {
    Login(req *LoginRequest) (*AuthResponse, error)
    Register(req *RegisterRequest) (*AuthResponse, error)
}