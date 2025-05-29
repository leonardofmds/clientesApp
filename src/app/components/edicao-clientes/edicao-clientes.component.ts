import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';


@Component({
  selector: 'app-edicao-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edicao-clientes.component.html'
})
export class EdicaoClientesComponent implements OnInit {
  form: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', Validators.required],
      endereco: this.fb.group({
        id: [''],
        logradouro: ['', Validators.required],
        complemento: [''],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', Validators.required],
        cep: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.service.obterPorId(this.id).subscribe(cliente => {
        this.form.patchValue({
          id: cliente.id,
          nome: cliente.nome,
          email: cliente.email,
          cpf: cliente.cpf,
          dataNascimento: cliente.dataNascimento,
          endereco: cliente.enderecos[0] || {}
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const cliente: Cliente = {
      ...this.form.value,
      enderecos: [this.form.value.endereco]
    };

    this.service.atualizar(cliente).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => alert('Erro ao atualizar cliente: ' + err.message)
    });
  }
}
