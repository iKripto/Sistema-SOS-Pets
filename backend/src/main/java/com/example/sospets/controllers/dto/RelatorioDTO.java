package com.example.sospets.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RelatorioDTO {
    private Long totalAtendimentos;
    private Double valorTotal;
}