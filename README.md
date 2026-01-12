# Calendari de pràctiques FEMPO

Aplicació web feta amb Angular per calcular i visualitzar el període de pràctiques d’FP Dual/FEMPO sobre un calendari anual.  
Permet configurar la data d’inici i les hores de pràctiques, i mostra tant el resum numèric com la representació gràfica dels dies de pràctiques.

---

## 🧩 Objectiu del projecte

L’objectiu principal és:

- Calcular la data final de les pràctiques a partir:
  - Data d’inici
  - Hores totals de pràctiques
  - Hores diàries
- Tenir en compte:
  - Caps de setmana (no compten com a dies lectius)
  - Dies festius concrets del curs
- Mostrar el resultat:
  - En format text (dies lectius, hores reals, data final)
  - Pintat sobre un calendari visual d’un any sencer

---

## 🛠️ Tecnologies utilitzades

- **Angular** (standalone components)
- **TypeScript**
- **HTML / CSS**
- Git i GitHub per al control de versions i publicació

---

## 📁 Estructura principal

Les parts més importants del projecte són:

- `src/app/components/configuracion/`
  - Formulari de configuració de les pràctiques:
    - Data d’inici
    - Hores totals
    - Hores diàries
  - Mostra:
    - Data d’inici formatejada
    - Data final prevista
    - Dies lectius
    - Hores reals

- `src/app/components/calendari/`
  - Component que mostra el calendari complet de l’any.
  - Rep les dades calculades i pinta:
    - Dies normals
    - Caps de setmana
    - Festius
    - Dies de pràctiques en verd

- `src/app/shared/services/calendario.service.ts`
  - Lògica de negoci:
    - Càlcul del període de pràctiques
    - Càlcul de dies lectius i hores reals
    - Càlcul de la data final
    - Gestió del llistat de festius
    - Format de dates en català

- `src/app/shared/services/calendari.service.ts`
  - Genera l’estructura del calendari:
    - Dies de cada mes
    - Marcatge de caps de setmana
    - Marcatge de festius
    - Marcatge de dies de pràctiques dins del període calculat

- `src/app/core/models/`
  - Interfaces TypeScript per estructurar les dades:
    - Configuració del formulari
    - Resultat del càlcul
    - Període de pràctiques
    - Dia del calendari

---

## ⚙️ Funcionament bàsic

1. L’usuari introdueix:
  - Data d’inici de les pràctiques
  - Hores totals
  - Hores diàries

2. El servei de càlcul:
  - Calcula quants dies lectius fan falta
  - Avança dia a dia saltant caps de setmana i festius
  - Determina la data final del període
  - Calcula les hores reals segons els dies lectius

3. El component de calendari:
  - Genera l’any complet (12 mesos)
  - Marca:
    - Caps de setmana
    - Dies festius
    - Dies que formen part del període de pràctiques

4. El formulari i el calendari estan connectats:
  - Cada vegada que es canvia alguna dada del formulari,
    el calendari es torna a actualitzar automàticament.

---

## 🚀 Com executar el projecte

```bash
# Instal·lar dependències
npm install

# Executar en desenvolupament
ng serve

# Obrir al navegador
http://localhost:4200/
