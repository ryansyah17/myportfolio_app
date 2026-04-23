package usecase

import (
	"errors"
	"portofolio-backend/internal/domain"
)

type contactUsecase struct{ repo domain.ContactRepository }

func NewContactUsecase(repo domain.ContactRepository) domain.ContactUsecase {
    return &contactUsecase{repo: repo}
}

func (u *contactUsecase) GetAll() ([]domain.Contact, error) { return u.repo.FindAll() }
func (u *contactUsecase) GetByID(id uint) (*domain.Contact, error) { return u.repo.FindByID(id) }
func (u *contactUsecase) MarkAsRead(id uint) error { return u.repo.MarkAsRead(id) }
func (u *contactUsecase) Delete(id uint) error { return u.repo.Delete(id) }

func (u *contactUsecase) Send(c *domain.Contact) error {
    if c.Name == "" || c.Email == "" || c.Message == "" {
        return errors.New("nama, email, dan pesan tidak boleh kosong")
    }
    return u.repo.Create(c)
}