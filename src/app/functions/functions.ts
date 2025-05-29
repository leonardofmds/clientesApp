export function formataDataParaISO(date: string): string {
  const [dia, mes, ano] = date.split('/');
  return `${ano}-${mes}-${dia}`;
}

export function formataDataParaDDMMYYYY(date: string): string {
  const [ano, mes, dia] = date.split('-');
  return `${dia}/${mes}/${ano}`;
}