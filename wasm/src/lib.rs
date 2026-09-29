//! Módulo Rust → WebAssembly para procesar el dataset de cobertura mundial.
//! Compilar con: `wasm-pack build --target web --release`
//!
//! Nota: este módulo es código fuente de referencia; NO está integrado en el build
//! del sitio (el dataset actual es pequeño y se procesa en JS).

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Punto de cobertura (latitud/longitud en grados)
#[derive(Deserialize)]
struct Punto {
    lat: f64,
    lon: f64,
}

/// Vector 3D unitario sobre la esfera (para Three.js)
#[derive(Serialize)]
struct Vec3 {
    x: f32,
    y: f32,
    z: f32,
}

/// Convierte una lista JSON de `{lat, lon}` a posiciones 3D sobre una esfera de radio `r`.
/// Devuelve un arreglo plano [x0,y0,z0,x1,y1,z1,...] listo para un BufferAttribute.
#[wasm_bindgen]
pub fn lat_lon_a_esfera(json: &str, r: f32) -> Result<Vec<f32>, JsValue> {
    let puntos: Vec<Punto> = serde_json::from_str(json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let mut out = Vec::with_capacity(puntos.len() * 3);
    for p in puntos {
        let phi = (90.0 - p.lat).to_radians();
        let theta = (p.lon + 180.0).to_radians();
        let v = Vec3 {
            x: -(r as f64 * phi.sin() * theta.cos()) as f32,
            y: (r as f64 * phi.cos()) as f32,
            z: (r as f64 * phi.sin() * theta.sin()) as f32,
        };
        out.extend_from_slice(&[v.x, v.y, v.z]);
    }
    Ok(out)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn polo_norte_esta_en_y_positivo() {
        let r = lat_lon_a_esfera(r#"[{"lat":90.0,"lon":0.0}]"#, 1.0).unwrap();
        assert!((r[1] - 1.0).abs() < 1e-5);
    }
}
