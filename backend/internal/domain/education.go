package domain

import "time"

type Education struct {
    ID          uint      `json:"id" gorm:"primaryKey;autoIncrement"`
    School      string    `json:"school" gorm:"not null"`
    Degree      string    `json:"degree"`
    FieldOfStudy string   `json:"field_of_study"`
    StartYear   string    `json:"start_year"`
    EndYear     string    `json:"end_year"`
    Description string    `json:"description"`
    LogoURL     string    `json:"logo_url"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}

type EducationRepository interface {
    FindAll() ([]Education, error)
    FindByID(id uint) (*Education, error)
    Create(e *Education) error
    Update(e *Education) error
    Delete(id uint) error
}

type EducationUsecase interface {
    GetAll() ([]Education, error)
    GetByID(id uint) (*Education, error)
    Create(e *Education) error
    Update(e *Education) error
    Delete(id uint) error
}