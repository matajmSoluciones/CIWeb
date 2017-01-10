TurboColors Library
=======================

Libreria para el tratamiento del color en matrices imagenes en Canvas del lado cliente con Javascript, puedes aplicar cualquier operación matematica de tratamiento de imagenes con **TurboColors**

## Uso

**TurboColors** es un paquete de CIWeb Project por lo que debe llamar al archivo *TurboColors.js* para acceder a la funcionalidades.
```html
	<script type="text/javascript" src="/vendor/CIWeb/src/TurboColors.js"></script>
```

## Filtros

Colors cuenta con una serie de filtros matriciales que permiten aplicar los efectos más básicos en el procesamiento de imagenes, estas son constantes que forman parte del objeto **Colors** y deben ser usadas con el metodo *Convolution*.

### BLUR

El desenfoque Blur es uno de los filtros mas usados en el tratamiento de imagenes para crear el efecto de desenfoque o borrosidad en este caso es una matriz 5x5

```Javascript
	Colors.RGB.Efects.BLUR	//{bin:[Array],width:5,height:5}
```

### GAUSSIAN

EL filtro gaussiano es tambien una de los filtros de desenfoque más usados en el tratamiento de imagenes.

```Javascript
	Colors.RGB.Efects.GAUSSIAN	//{bin:[Array],width:5,height:5}
```

### MEDIA

```Javascript
	Colors.RGB.Efects.GAUSSIAN	//{bin:[Array],width:5,height:5}
```

### Suavizado Sharpen

```Javascript
	Colors.RGB.Efects.SHARPEN	//{bin:[Array],width:5,height:5}
```
### Siluetas Emboss

```Javascript
	Colors.RGB.Efects.EMBOSS	//{bin:[Array],width:5,height:5}
```

## Detectores de bordes

Los detectores son filtros que separan la imagen de los gradientes mas resaltantes que representa los bordes de una imagen.

### Laplaciano y Gaussiano
Mezcla combinada en orden de Laplaciano y Gaussiano operados matematicamente para ejecutarse en una sola función.

```Javascript
	Colors.RGB.Efects.LAGAUSSIANO	//{bin:[Array],width:5,height:5}
```
### Operador de Prewit Vertical

```Javascript
	Colors.RGB.Efects.PREWITTV	//{bin:[Array],width:5,height:5}
```
### Operador de Prewit Horizontal

```Javascript
	Colors.RGB.Efects.PREWITTH	//{bin:[Array],width:5,height:5}
```

### Operador de Sobel Vertical

```Javascript
	Colors.RGB.Efects.SOBELV	//{bin:[Array],width:5,height:5}
```
### Operador de Sobel Horizontal

```Javascript
	Colors.RGB.Efects.SOBELH	//{bin:[Array],width:5,height:5}
```
### Laplaciano

```Javascript
	Colors.RGB.Efects.LAPLACIANO	//{bin:[Array],width:5,height:5}
```

## Convolution

Puedes usar TurboColors para operar matrices imagenes en forma de vector inversa a la matriz HxW con *Convolution* donde H representa el alto y W el ancho, es la operación de multiplicación de filtros en una imagen.

### Sintaxis

	Colors.Convolution(I,K,width,ESCALAR,BIAS,mode)

### Parametros

**I** Uint8ClampedArray || Array

Representa el vector imagen ordenado por el ancho de la imagen correspondiente a los 3 canales (RGB) mas el alpha.

**K** Object

Representa el filtro a aplicarse en la imagen, se recomienda usar los filtros mencionados anteriormente en caso de armar su propio filtro mantener la siguiente estructura

```json
	{bin:[Array],width:w,height:h}
```

**ESCALAR** [0-255]

Incrementa o decrementa los valores de la convolución original por defecto este valor es 1

**ESCALAR** Number

Valor de desplazamiento de la imagen por defecto este valor es 0

**mode**

Establece el modo que ingresa la matriz imagen *BIN* para imagenes de un solo canal y *RGB* para imagenes de 3 canales más alpha

# Operaciones para RGB

A parte de los filtros **TurboColors** ofrece una serie de operaciones para el espacio de color RGB.

## parseToHSV

Cambia los valores actuales al espacio de color HSV

	Colors.RGB.parseToHSV(R,G,B)

Donde los parametros representan el valor respectivo a cada canal

El retorno de la función es un objecto con la estructura

	{r:valor,g:valor,b:valor}

## parseToHSL

Cambia los valores actuales al espacio de color HSL

	Colors.RGB.parseToHSL(R,G,B)

Donde los parametros representan el valor respectivo a cada canal

El retorno de la función es un objecto con la estructura

	{h:valor,s:valor,l:valor}

## parseToNormalized

Cambia los valores actuales al espacio de color RGB normalizado

	Colors.RGB.parseToNormalized(R,G,B)

Donde los parametros representan el valor respectivo a cada canal

El retorno de la función es un objecto con la estructura

	{r:valor,g:valor,b:valor}

## parseToYCrCb

Cambia los valores actuales al espacio de color YCrCb

	Colors.RGB.parseToYCrCb(R,G,B)

Donde los parametros representan el valor respectivo a cada canal

El retorno de la función es un objecto con la estructura

	{y:valor,Cr:valor,Cb:valor}

## parseToTLS

Cambia los valores actuales al espacio de color TLS

	Colors.RGB.parseToTLS(R,G,B)

Donde los parametros representan el valor respectivo a cada canal

El retorno de la función es un objecto con la estructura

	{t:valor,l:valor,s:valor}

## parseToLux

Cambia los valores actuales y calcula la luminancia aproximada en el color, para que se vea un efecto real en una imagen para la predicción de la luminancia en un entorno es recomendable crear una frecuencia acumulada de todos los pixeles y calcular la media.

	Colors.RGB.parseToLux(R,G,B)

Donde los parametros representan el valor respectivo a cada canal

El retorno de la función es un valor numerico representativo de luminancia

## isHuman

Devuelve un boleano verdadero si el color supera el umbral determinado para ser cercano a piel humana, este es un clasificador debil de piel basado en umbrales de decisiones.

	Colors.RGB.isHuman(R,G,B)
