package repository

import (
	"portofolio-backend/internal/domain"

	"gorm.io/gorm"
)

type userRepository struct {
    db *gorm.DB
}

func NewUserRepository(db *gorm.DB) domain.UserRepository {
    return &userRepository{db: db}
}

func (r *userRepository) FindByEmail(email string) (*domain.User, error) {
    var user domain.User
    result := r.db.Where("email = ?", email).First(&user)
    if result.Error != nil {
        return nil, result.Error
    }
    return &user, nil
}

func (r *userRepository) FindByID(id uint) (*domain.User, error) {
    var user domain.User
    result := r.db.First(&user, id)
    if result.Error != nil {
        return nil, result.Error
    }
    return &user, nil
}

func (r *userRepository) Create(user *domain.User) error {
    return r.db.Create(user).Error
}