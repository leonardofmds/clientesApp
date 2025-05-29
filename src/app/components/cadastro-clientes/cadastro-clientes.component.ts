import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { formataDataParaDDMMYYYY } from '../../functions/functions';


@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-clientes.component.html'
})
export class CadastroClientesComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: ClienteService, private router: Router) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', Validators.required],
      endereco: this.fb.group({
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

  onSubmit(): void {
    if (this.form.invalid) return;

    const cliente: Cliente = {
      ...this.form.value,
      enderecos: [this.form.value.endereco]
    };

    cliente.dataNascimento = formataDataParaDDMMYYYY(cliente.dataNascimento);

    this.service.cadastrar(cliente).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => alert('Erro ao cadastrar cliente: ' + err.message)
    });
  }

  get f() { return this.form.controls; }
  get e() { return (this.form.get('endereco') as FormGroup).controls; }
}
