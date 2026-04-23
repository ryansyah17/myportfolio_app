package repository

import (
	"portofolio-backend/internal/domain"

	"gorm.io/gorm"
)

type contactRepository struct{ db *gorm.DB }

func NewContactRepository(db *gorm.DB) domain.ContactRepository {
    return &contactRepository{db: db}
}

func (r *contactRepository) FindAll() ([]domain.Contact, error) {
    var list []domain.Contact
    return list, r.db.Order("created_at desc").Find(&list).Error
}

func (r *contactRepository) FindByID(id uint) (*domain.Contact, error) {
    var c domain.Contact
    return &c, r.db.First(&c, id).Error
}

func (r *contactRepository) Create(c *domain.Contact) error {
    return r.db.Create(c).Error
}

func (r *contactRepository) MarkAsRead(id uint) error {
    return r.db.Model(&domain.Contact{}).Where("id = ?", id).Update("is_read", true).Error
}

func (r *contactRepository) Delete(id uint) error {
    return r.db.Delete(&domain.Contact{}, id).Error
}