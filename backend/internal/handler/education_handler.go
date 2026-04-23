package handler

import (
	"net/http"
	"strconv"

	"portofolio-backend/internal/domain"
	"portofolio-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type EducationHandler struct{ usecase domain.EducationUsecase }

func NewEducationHandler(u domain.EducationUsecase) *EducationHandler {
    return &EducationHandler{usecase: u}
}

func (h *EducationHandler) GetAll(c *gin.Context) {
    data, err := h.usecase.GetAll()
    if err != nil { response.Error(c, http.StatusInternalServerError, err.Error()); return }
    response.Success(c, http.StatusOK, "Berhasil", data)
}

func (h *EducationHandler) GetByID(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    data, err := h.usecase.GetByID(uint(id))
    if err != nil { response.Error(c, http.StatusNotFound, "Data tidak ditemukan"); return }
    response.Success(c, http.StatusOK, "Berhasil", data)
}

func (h *EducationHandler) Create(c *gin.Context) {
    var e domain.Education
    if err := c.ShouldBindJSON(&e); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    if err := h.usecase.Create(&e); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    response.Success(c, http.StatusCreated, "Berhasil dibuat", e)
}

func (h *EducationHandler) Update(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    var e domain.Education
    if err := c.ShouldBindJSON(&e); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    e.ID = uint(id)
    if err := h.usecase.Update(&e); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    response.Success(c, http.StatusOK, "Berhasil diupdate", e)
}

func (h *EducationHandler) Delete(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    if err := h.usecase.Delete(uint(id)); err != nil {
        response.Error(c, http.StatusNotFound, err.Error()); return
    }
    response.Success(c, http.StatusOK, "Berhasil dihapus", nil)
}