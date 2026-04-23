package usecase

import (
	"errors"
	"portofolio-backend/internal/domain"
)

type educationUsecase struct{ repo domain.EducationRepository }

func NewEducationUsecase(repo domain.EducationRepository) domain.EducationUsecase {
    return &educationUsecase{repo: repo}
}

func (u *educationUsecase) GetAll() ([]domain.Education, error) { return u.repo.FindAll() }
func (u *educationUsecase) GetByID(id uint) (*domain.Education, error) { return u.repo.FindByID(id) }

func (u *educationUsecase) Create(e *domain.Education) error {
    if e.School == "" { return errors.New("nama sekolah tidak boleh kosong") }
    return u.repo.Create(e)
}

func (u *educationUsecase) Update(e *domain.Education) error {
    if _, err := u.repo.FindByID(e.ID); err != nil {
        return errors.New("data tidak ditemukan")
    }
    return u.repo.Update(e)
}

func (u *educationUsecase) Delete(id uint) error {
    if _, err := u.repo.FindByID(id); err != nil {
        return errors.New("data tidak ditemukan")
    }
    return u.repo.Delete(id)
}