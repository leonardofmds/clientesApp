export interface Endereco {
  id?: string;
  logradouro: string;
  complemento: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

export interface Cliente {
  id?: string;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  enderecos: Endereco[];
}
