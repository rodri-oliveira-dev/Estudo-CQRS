# PADRÕES PARA ESTILOS DO DIRECTA FRAMEWORK
Este documento normatiza os padrões de escritas de estilos dentro do Directa Framework (front-end web - versão Angular).

## Nomenclatura padronizada

### **Problema** 
Um grande volume de classes de estilo (css) pode ser complexos de gerenciar. A falta de padrão pode comprometer a qualidade de manutenção do código e provocar ambiguidades.

### **Solução** 
Nomear as classes no arquivo de estilo de forma que elas indiquem de forma expressiva quais os componentes/elementos/atributos que a quela classe modifica.

### **Aplicação**
Os arquivos de estilo são divididos em duas categorias: 

* **Estilo glogal**:
São estilos contidos nos arquivos de customização localizados no caminho "*/assets/css*". As classes dentro desses arquivos devem seguir os seguintes padrões:

```css
/* padrão */
.[nome do componente]-[elemento]-[atributo]{...}

/* exemplo */
.app-cabecalho-cor { backgroud-color: #000 }
```

*  **Estilos embarcados**: são estilos associados a um componente específico. No angular quando se quer aplicar um estilo sobre o html do componente é preciso utilizar a palavra (:host), como no exemplo abaixo:

```css
/* padrão */
:host [elemento]{...}
:host .[classe] {...}
:host #[id] {...}

/* exemplo */
:host header { ... }
:host .my-header { ... }
:host #my-header { ... }
```


# Arquivos de customização
Abaixo segue a lista contendo os arquivos de customização de estilo da aplicação e suas respectivas descrições. 

* **initializer.css** - Inicialização do html.
* **colors.css** - cores padrões do app
