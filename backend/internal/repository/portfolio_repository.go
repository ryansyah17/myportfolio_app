package repository

import (
	"portofolio-backend/internal/domain"

	"gorm.io/gorm"
)

type portfolioRepository struct {
    db *gorm.DB
}

// NewPortfolioRepository membuat instance repository baru
func NewPortfolioRepository(db *gorm.DB) domain.PortfolioRepository {
    return &portfolioRepository{db: db}
}

func (r *portfolioRepository) FindAll() ([]domain.Portfolio, error) {
    var portfolios []domain.Portfolio
    result := r.db.Order("created_at desc").Find(&portfolios)
    return portfolios, result.Error
}

func (r *portfolioRepository) FindByID(id uint) (*domain.Portfolio, error) {
    var portfolio domain.Portfolio
    result := r.db.First(&portfolio, id)
    if result.Error != nil {
        return nil, result.Error
    }
    return &portfolio, nil
}

func (r *portfolioRepository) Create(portfolio *domain.Portfolio) error {
    return r.db.Create(portfolio).Error
}

func (r *portfolioRepository) Update(portfolio *domain.Portfolio) error {
    return r.db.Save(portfolio).Error
}

func (r *portfolioRepository) Delete(id uint) error {
    return r.db.Delete(&domain.Portfolio{}, id).Error
}