# BuzzyHive 2.0 — M6 Assembly Guide
## ESP32 + DHT11 + MQ2 → Local MySQL
*Generated: 2026-04-10 | Follow independently — share one photo per checkpoint*

---

## Components Checklist

Before starting, confirm you have all of these:

| # | Component | Count |
|---|-----------|-------|
| 1 | ESP32 DevKit v1 | 1 |
| 2 | DHT11 module (blue, 3-pin breakout, labeled V102) | 1 |
| 3 | MQ2 module (blue PCB, FlyingFish, 4-pin) | 1 |
| 4 | Male-to-female jumper wires | at least 7 |
| 5 | USB cable (to power ESP32 from laptop) | 1 |

---

## Pin Reference

### DHT11 Module (3 pins, left to right when facing the sensor grid)
```
[ VCC ] [ DATA ] [ GND ]
```
| DHT11 Pin | Connect To |
|-----------|-----------|
| VCC | ESP32 3V3 |
| DATA | ESP32 GPIO4 |
| GND | ESP32 GND |

> No external pull-up resistor needed — the V102 breakout module has one built in.

---

### MQ2 Module (4 pins, labeled on the PCB)
```
[ VCC ] [ GND ] [ DOUT ] [ AOUT ]
```
| MQ2 Pin | Connect To | Notes |
|---------|-----------|-------|
| VCC | ESP32 VIN (5V) | MQ2 heater needs 5V — do NOT use 3V3 |
| GND | ESP32 GND | |
| DOUT | Not connected | Digital threshold — not used |
| AOUT | ESP32 GPIO34 (via voltage divider) | See divider below |

> **Why voltage divider?** MQ2 AOUT can output up to 5V but ESP32 ADC pins max out at 3.3V. The divider brings 5V → 3.3V safely.

---

### Voltage Divider for MQ2 AOUT
You need two resistors: **10kΩ and 20kΩ**.

```
MQ2 AOUT ──[10kΩ]──┬──► ESP32 GPIO34
                   │
                 [20kΩ]
                   │
                  GND
```

> If you do not have resistors, you can temporarily connect AOUT directly to GPIO34 for a quick test — but the ADC readings will be unreliable above ~3.3V and could damage the pin over time. Use resistors for real use.

---

## Full Wiring Summary

| Wire | From | To |
|------|------|----|
| 1 | DHT11 VCC | ESP32 3V3 |
| 2 | DHT11 DATA | ESP32 GPIO4 |
| 3 | DHT11 GND | ESP32 GND |
| 4 | MQ2 VCC | ESP32 VIN |
| 5 | MQ2 GND | ESP32 GND |
| 6 | MQ2 AOUT | Voltage divider → ESP32 GPIO34 |

---

## Assembly Checkpoints

Work through these one section at a time. Share one photo per checkpoint.

---

### Checkpoint 1 — DHT11 Wired
Wire the DHT11 module only. Leave MQ2 aside.

1. Connect DHT11 VCC → ESP32 **3V3** pin
2. Connect DHT11 DATA → ESP32 **GPIO4** (labeled D4 or IO4 on the board)
3. Connect DHT11 GND → ESP32 **GND**

**Share a photo of this before continuing.**

---

### Checkpoint 2 — MQ2 Power Wired
Add MQ2 power only (no AOUT yet).

1. Connect MQ2 VCC → ESP32 **VIN** (the 5V pin — NOT 3V3)
2. Connect MQ2 GND → ESP32 **GND**

Power on the ESP32. The MQ2 module should have a red LED on after ~30 seconds of warmup.

**Share a photo of this before continuing.**

---

### Checkpoint 3 — MQ2 AOUT Wired (with or without divider)
Connect MQ2 AOUT to ESP32 GPIO34.

- **With resistors:** build the voltage divider (10kΩ + 20kΩ) between AOUT and GPIO34
- **Without resistors (temp test only):** connect AOUT directly to GPIO34

**Share a photo of the final wired setup before flashing.**

---

## What Comes After Assembly

Once all 3 checkpoints are done and verified, the next steps are:
1. Flash the Arduino sketch (provided separately)
2. Verify sensor readings on Serial Monitor
3. Run Laravel locally (`php artisan serve`)
4. Confirm data appears in local MySQL

---

*BuzzyHive 2.0 — M6 Hardware Assembly Guide*
