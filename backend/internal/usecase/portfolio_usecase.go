package usecase

import (
	"errors"

	"portofolio-backend/internal/domain"
)

type portfolioUsecase struct {
    repo domain.PortfolioRepository
}

func NewPortfolioUsecase(repo domain.PortfolioRepository) domain.PortfolioUsecase {
    return &portfolioUsecase{repo: repo}
}

func (u *portfolioUsecase) GetAll() ([]domain.Portfolio, error) {
    return u.repo.FindAll()
}

func (u *portfolioUsecase) GetByID(id uint) (*domain.Portfolio, error) {
    return u.repo.FindByID(id)
}

func (u *portfolioUsecase) Create(portfolio *domain.Portfolio) error {
    if portfolio.Title == "" {
        return errors.New("judul portfolio tidak boleh kosong")
    }
    return u.repo.Create(portfolio)
}

func (u *portfolioUsecase) Update(portfolio *domain.Portfolio) error {
    if portfolio.Title == "" {
        return errors.New("judul portfolio tidak boleh kosong")
    }
    // Pastikan data ada sebelum update
    _, err := u.repo.FindByID(portfolio.ID)
    if err != nil {
        return errors.New("portfolio tidak ditemukan")
    }
    return u.repo.Update(portfolio)
}

func (u *portfolioUsecase) Delete(id uint) error {
    _, err := u.repo.FindByID(id)
    if err != nil {
        return errors.New("portfolio tidak ditemukan")
    }
    return u.repo.Delete(id)
}