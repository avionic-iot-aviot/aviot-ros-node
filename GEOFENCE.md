# GeoFence
## Modalità di funzionamento
Il drone espone i servizi `/mavros/fence/set` e `/mavros/fence/delete`. Il primo permette di specificare un’area permessa/interdetta, il secondo permette di eliminare una delle aree precedentemente definita.
Inizialmente nessuna area è definita e quindi il drone può assumere qualunque posizione (figura 1).
Nel caso in cui ci siano aree definite:
- se sono tutte del tipo `MODE_ALLOW`, il drone deve necessariamente trovarsi all’interno di almeno una di queste aree (figure 2, 3 e 4);
- se sono tutte del tipo `MODE_DENY`, il drone deve necessariamente trovarsi all’esterno di tutte le aree (figure 5, 6 e 7);
- se sono state definite aree di entrambi i tipi, il drone deve trovarsi all’esterno di tutte le aree del tipo `MODE_DENY` e all’interno di almeno una delle aree del tipo `MODE_ALLOW` (figure 8, 9, 10 e 11);

Inoltre, **nessuna area del tipo `MODE_DENY` può contenere il punto Home e deve esserci sempre un path totalmente contenuto all’interno di aree del tipo `MODE_ALLOW`** (se presenti) e che permetta al drone di raggiungere il punto Home senza attraversare aree del tipo `MODE_DENY`.

## Definizione servizio `SetFence`

### Sistema di riferimento utilizzato per definire i punti (vedi sotto).
```
# see enum MAV_FRAME
uint8 frame
uint8 FRAME_GLOBAL = 0
uint8 FRAME_LOCAL_NED = 1
uint8 FRAME_LOCAL_ENU = 4
uint8 FRAME_GLOBAL_INT = 5
uint8 FRAME_LOCAL_OFFSET_NED = 7
```


### Modalità di funzionamento:

```
uint8 mode
uint8 MODE_DENY = 0
uint8 MODE_ALLOW = 1
```

- se `mode = MODE_DENY`, il poligono identifica un’area interdetta;
- se `mode = MODE_ALLOW`, il poligono identifica un’area permessa;

Se vi sono aree sovrapposte, quelle  interdette hanno la priorità.


### Array di punti che identifica il poligono.
```
geometry_msgs/Point[] points
```

### Risposta
```
int32 polygon_id
int32 E_INVALID_POLYGON = -1
int32 E_INVALID_MODE = -2
int32 E_INVALID_FRAME = -3
```
- `polygon_id`: ID univoco associato al poligono appena ricevuto. Se negativo, la richiesta non è valida.



### Sistemi di riferimento accettati:

- Frame `FRAME_GLOBAL`: Sistema di coordinate **WGS84** + altitudine (ignorata):
  - x: latitudine
  - y: longitudine
  - z: ignorato


- Frame: `FRAME_LOCAL_NED`: Sistema di **coordinate locali** (North - East - Down):
  - x: nord
  - y: est
  - z: ignorato

- Frame: `FRAME_LOCAL_ENU`: Sistema di **coordinate locali** (East - North - Up):
  - x: nord
  - y: est
  - z: ignorato
- Frame `FRAME_GLOBAL_INT`: Sistema di coordinate WGS84 (scalato) + altitudine (ignorata):
  - x: latitudine * 10e-7
  - y: longitudine * 10e-7
  - z: ignorato
- Frame `FRAME_LOCAL_OFFSET_NED`: Offset relativo alla posizione locale (North - East - Down)



## Definizione servizio `DeleteFence`
File DeleteFence.srv
### Richiesta

`int32 polygon_id`: ID del poligono da eliminare.

### Risposta
`int32 done`: Assume valore 1 se l’eliminazione ha avuto successo, 0 altrimenti



