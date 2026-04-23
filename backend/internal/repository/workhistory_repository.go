package repository

import (
	"portofolio-backend/internal/domain"

	"gorm.io/gorm"
)

type workHistoryRepository struct{ db *gorm.DB }

func NewWorkHistoryRepository(db *gorm.DB) domain.WorkHistoryRepository {
    return &workHistoryRepository{db: db}
}

func (r *workHistoryRepository) FindAll() ([]domain.WorkHistory, error) {
    var list []domain.WorkHistory
    return list, r.db.Order("start_date desc").Find(&list).Error
}

func (r *workHistoryRepository) FindByID(id uint) (*domain.WorkHistory, error) {
    var w domain.WorkHistory
    return &w, r.db.First(&w, id).Error
}

func (r *workHistoryRepository) Create(w *domain.WorkHistory) error {
    return r.db.Create(w).Error
}

func (r *workHistoryRepository) Update(w *domain.WorkHistory) error {
    return r.db.Save(w).Error
}

func (r *workHistoryRepository) Delete(id uint) error {
    return r.db.Delete(&domain.WorkHistory{}, id).Error
}