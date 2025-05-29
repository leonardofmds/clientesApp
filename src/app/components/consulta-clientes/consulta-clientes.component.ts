import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';


@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consulta-clientes.component.html'
})
export class ConsultaClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private service: ClienteService) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.service.listar().subscribe({
      next: data => this.clientes = data,
      error: err => alert('Erro ao carregar clientes: ' + err.message)
    });
  }

  excluirCliente(id: string): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.service.excluir(id).subscribe({
        next: () => this.carregarClientes(),
        error: err => alert('Erro ao excluir cliente: ' + err.message)
      });
    }
  }
}