package usecase

import (
	"errors"
	"portofolio-backend/internal/domain"
)

type workHistoryUsecase struct{ repo domain.WorkHistoryRepository }

func NewWorkHistoryUsecase(repo domain.WorkHistoryRepository) domain.WorkHistoryUsecase {
    return &workHistoryUsecase{repo: repo}
}

func (u *workHistoryUsecase) GetAll() ([]domain.WorkHistory, error) { return u.repo.FindAll() }
func (u *workHistoryUsecase) GetByID(id uint) (*domain.WorkHistory, error) { return u.repo.FindByID(id) }

func (u *workHistoryUsecase) Create(w *domain.WorkHistory) error {
    if w.Company == "" || w.Position == "" {
        return errors.New("company dan position tidak boleh kosong")
    }
    return u.repo.Create(w)
}

func (u *workHistoryUsecase) Update(w *domain.WorkHistory) error {
    if _, err := u.repo.FindByID(w.ID); err != nil {
        return errors.New("data tidak ditemukan")
    }
    return u.repo.Update(w)
}

func (u *workHistoryUsecase) Delete(id uint) error {
    if _, err := u.repo.FindByID(id); err != nil {
        return errors.New("data tidak ditemukan")
    }
    return u.repo.Delete(id)
}