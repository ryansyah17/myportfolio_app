package handler

import (
	"net/http"
	"strconv"

	"portofolio-backend/internal/domain"
	"portofolio-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

type WorkHistoryHandler struct{ usecase domain.WorkHistoryUsecase }

func NewWorkHistoryHandler(u domain.WorkHistoryUsecase) *WorkHistoryHandler {
    return &WorkHistoryHandler{usecase: u}
}

func (h *WorkHistoryHandler) GetAll(c *gin.Context) {
    data, err := h.usecase.GetAll()
    if err != nil { response.Error(c, http.StatusInternalServerError, err.Error()); return }
    response.Success(c, http.StatusOK, "Berhasil", data)
}

func (h *WorkHistoryHandler) GetByID(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    data, err := h.usecase.GetByID(uint(id))
    if err != nil { response.Error(c, http.StatusNotFound, "Data tidak ditemukan"); return }
    response.Success(c, http.StatusOK, "Berhasil", data)
}

func (h *WorkHistoryHandler) Create(c *gin.Context) {
    var w domain.WorkHistory
    if err := c.ShouldBindJSON(&w); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    if err := h.usecase.Create(&w); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    response.Success(c, http.StatusCreated, "Berhasil dibuat", w)
}

func (h *WorkHistoryHandler) Update(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    var w domain.WorkHistory
    if err := c.ShouldBindJSON(&w); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    w.ID = uint(id)
    if err := h.usecase.Update(&w); err != nil {
        response.Error(c, http.StatusBadRequest, err.Error()); return
    }
    response.Success(c, http.StatusOK, "Berhasil diupdate", w)
}

func (h *WorkHistoryHandler) Delete(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    if err := h.usecase.Delete(uint(id)); err != nil {
        response.Error(c, http.StatusNotFound, err.Error()); return
    }
    response.Success(c, http.StatusOK, "Berhasil dihapus", nil)
}