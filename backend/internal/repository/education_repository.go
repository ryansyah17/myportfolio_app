package repository

import (
	"portofolio-backend/internal/domain"

	"gorm.io/gorm"
)

type educationRepository struct{ db *gorm.DB }

func NewEducationRepository(db *gorm.DB) domain.EducationRepository {
    return &educationRepository{db: db}
}

func (r *educationRepository) FindAll() ([]domain.Education, error) {
    var list []domain.Education
    return list, r.db.Order("start_year desc").Find(&list).Error
}

func (r *educationRepository) FindByID(id uint) (*domain.Education, error) {
    var e domain.Education
    return &e, r.db.First(&e, id).Error
}

func (r *educationRepository) Create(e *domain.Education) error {
    return r.db.Create(e).Error
}

func (r *educationRepository) Update(e *domain.Education) error {
    return r.db.Save(e).Error
}

func (r *educationRepository) Delete(id uint) error {
    return r.db.Delete(&domain.Education{}, id).Error
}