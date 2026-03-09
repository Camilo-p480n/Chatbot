export const interpretMessage = async (message) => {

  const text = message.toLowerCase();

  // detectar monto
  const amountMatch = text.match(/\d+/);
  const amount = amountMatch ? Number(amountMatch[0]) : null;

  // -----------------------
  // CONSULTAS
  // -----------------------

  if (
    text.includes("cuanto") ||
    text.includes("resumen") ||
    text.includes("gaste este mes") ||
    text.includes("cuanto gaste")
  ) {

    return {
      type: "query"
    };

  }

  // -----------------------
  // DETECTAR CATEGORIA
  // -----------------------

  let category = "otros";

  if (text.includes("comida") || text.includes("restaurante") || text.includes("almuerzo")) {
    category = "comida";
  }

  if (text.includes("uber") || text.includes("taxi") || text.includes("transporte") || text.includes("gasolina")) {
    category = "transporte";
  }

  if (text.includes("mercado") || text.includes("supermercado")) {
    category = "mercado";
  }

  if (text.includes("netflix") || text.includes("spotify")) {
    category = "entretenimiento";
  }

  // -----------------------
  // GASTOS
  // -----------------------

  if (
    text.includes("gast") ||
    text.includes("pague") ||
    text.includes("compr")
  ) {

    return {
      type: "expense",
      amount,
      category,
      description: message
    };

  }

  // -----------------------
  // INGRESOS
  // -----------------------

  if (
    text.includes("ingres") ||
    text.includes("gan") ||
    text.includes("recib") ||
    text.includes("salario") ||
    text.includes("pago")
  ) {

    return {
      type: "income",
      amount,
      category,
      description: message
    };

  }

  // -----------------------
  // NO ENTENDIDO
  // -----------------------

  return {
    type: "unknown"
  };

};