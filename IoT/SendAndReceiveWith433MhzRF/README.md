!! Documentation in work

# Sending and receive signals on 433Mhz
The goal of this sketch is to send a signal or some data to a receiver through the 433Mhz band. The receiver is on a Raspberry located (see also the circuit diagramm).
The special about the receiver is, that it is implemented with dotnet core (2.0).   

## Hardware
The following components are used: 
+ Arduino Nano (ATmega328)
+ RF Emitter (with 3 pins + Antenna) and RF Transmitter (with 4 pins + Antenna) (e.g. https://www.amazon.de/dp/B071J2Z3YK/ref=cm_sw_em_r_mt_dp_U_KZiGAbJFPW75R)
+ Raspberry Pi

## Software
### Arduino
+ Arduino IDE or Visual Studio Code (with Arduino extension)
+ Library rc-switch (is accessable through the Arduino Library manager)

  rc-switch is a library (https://github.com/sui77/rc-switch) to operate with 433Mhz devices. It can used with arduino or with Raspberry Pi.

### Raspberry Pi
+ dotnet core SDK (must be installed)
+ Visual Studio 2017 or Visual Studio Code
+ Wiringpi (https://projects.drogon.net/raspberry-pi/wiringpi/download-and-install/), should be installed on the rasp
+ rc-switch (also see coding and run)


## Coding and run
The following description describes the both parts to send and receive some data.
First part is to send data with the Arduino, the second part is to receive the data on a rasp with a dotnet core console application.

### Arduino part -- sending data
The Arduino part is quit simple, because they need only the emiter and the rc-switch library.
1. Connect the Emitter with the Arduino

    Emitter pin "+" --> Arduino pin "5v"

    Emitter pin "-" --> Arduino pin "Gnd"

    Emitter pin "data" --> Arduino pin "D10"

    See also the circuit.
2. Open the project "SendDataFromRFEmitter" with Visual Studio code (or Arduino IDE)
3. Open the "Arduino:Library manager" and install the "rc-switch" library
4. Connect the Arduino with a USB Port on the PC (Windows 10) (maybe you must findout first with COM port is used -> Arduino Select serial port)
5. Upload the Sketch to the Arduino (Arduino:Upload)
6. After upload, Arduino is sending data (in the sketch there are defined two integer to send), the LED on the Arduino board is also blinking during send).

### Raspberry part -- receive data
The special part on the rasp is, that we want use dotnet core to receive the messages. For this sample the goal is not to read the messages direct from the GPIO and to translate it back to the sent integer. For that we will use also the rc-switch library that makes this work for us. But it is not possible to use the rc-switch library with a dotnet core application. To use the rc-switch library we need a shared library that can be Invoked (dllimport) in dotnet core. This is already prepared and added to the "ReadDataFromRFReceiver/ReadDataFromRFReceiver" dotnet core project. How to create the shared library see topic below.

1. Connect the Transmitter with the rasp

    Transmitter pin "Gnd" --> rasp pin "Gnd" (physical 6)

    Transmitter pin "Vcc" --> rasp pin "5V" (physical 4)

    Transmitter pin (only one) "Data" --> rasp pin GPIO 2 (BCM 27)  (physical 13)

1. The code source for the dotnet core receiver application are in the folder "ReadDataFromRFReceiver/ReadDataFromRFReceiver"
2. First, the source must be build and published for the raspberry, to do that do following

   Open a powershell console in the project folder, build and publish the project
   ```powershell
   dotnet build
   dotnet publish -c Release -r linux-arm 
   ```
3. Copy the whole publish folder to a folder on the rasp (e.g scp or with a shared folder)
4. Switch to the rasp, open a shell and navigate to the publish folder
5. Start the dotnet application:

    ```shell
    ./ReadDataFromRFReceiver
    ``` 
6. After some seconds the signals/integer from the Arduino should be appear


## Create the shared library for rc-switch
In work

## Circuit diagramm

In work


## FAQ
+ What if RF? 

  RF is a protocol