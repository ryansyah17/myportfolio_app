package usecase

import (
	"errors"
	"regexp"
	"strings"

	"portofolio-backend/internal/domain"
)

type blogUsecase struct{ repo domain.BlogRepository }

func NewBlogUsecase(repo domain.BlogRepository) domain.BlogUsecase {
    return &blogUsecase{repo: repo}
}

func (u *blogUsecase) GetAll(onlyPublished bool) ([]domain.Blog, error) {
    return u.repo.FindAll(onlyPublished)
}

func (u *blogUsecase) GetBySlug(slug string) (*domain.Blog, error) {
    return u.repo.FindBySlug(slug)
}

func (u *blogUsecase) GetByID(id uint) (*domain.Blog, error) {
    return u.repo.FindByID(id)
}

func (u *blogUsecase) Create(b *domain.Blog) error {
    if b.Title == "" { return errors.New("judul tidak boleh kosong") }
    // Auto generate slug dari title
    if b.Slug == "" {
        b.Slug = generateSlug(b.Title)
    }
    return u.repo.Create(b)
}

func (u *blogUsecase) Update(b *domain.Blog) error {
    if _, err := u.repo.FindByID(b.ID); err != nil {
        return errors.New("blog tidak ditemukan")
    }
    return u.repo.Update(b)
}

func (u *blogUsecase) Delete(id uint) error {
    if _, err := u.repo.FindByID(id); err != nil {
        return errors.New("blog tidak ditemukan")
    }
    return u.repo.Delete(id)
}

// generateSlug — ubah "Hello World" jadi "hello-world"
func generateSlug(title string) string {
    slug := strings.ToLower(title)
    slug = strings.ReplaceAll(slug, " ", "-")
    reg := regexp.MustCompile(`[^a-z0-9-]`)
    slug = reg.ReplaceAllString(slug, "")
    return slug
}