package repository

import (
	"portofolio-backend/internal/domain"

	"gorm.io/gorm"
)

type blogRepository struct{ db *gorm.DB }

func NewBlogRepository(db *gorm.DB) domain.BlogRepository {
    return &blogRepository{db: db}
}

func (r *blogRepository) FindAll(onlyPublished bool) ([]domain.Blog, error) {
    var list []domain.Blog
    q := r.db.Order("created_at desc")
    if onlyPublished {
        q = q.Where("is_published = ?", true)
    }
    return list, q.Find(&list).Error
}

func (r *blogRepository) FindBySlug(slug string) (*domain.Blog, error) {
    var b domain.Blog
    return &b, r.db.Where("slug = ?", slug).First(&b).Error
}

func (r *blogRepository) FindByID(id uint) (*domain.Blog, error) {
    var b domain.Blog
    return &b, r.db.First(&b, id).Error
}

func (r *blogRepository) Create(b *domain.Blog) error {
    return r.db.Create(b).Error
}

func (r *blogRepository) Update(b *domain.Blog) error {
    return r.db.Save(b).Error
}

func (r *blogRepository) Delete(id uint) error {
    return r.db.Delete(&domain.Blog{}, id).Error
}