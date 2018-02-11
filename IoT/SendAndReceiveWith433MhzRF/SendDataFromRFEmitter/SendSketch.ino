#include <RCSwitch.h>

RCSwitch mySwitch = RCSwitch();

void setup()
{
  Serial.begin(9600);
  mySwitch.enableTransmit(10);
}

void loop()
{
  Serial.println("nextloop to send");

  mySwitch.send(9999, 24);
  LedOn();
  delay(1000);

  mySwitch.send(8888, 24);
  LedOn();

  delay(20000);
}

void LedOn()
{
  digitalWrite(LED_BUILTIN, HIGH); // turn the LED on (HIGH is the voltage level)
  delay(1000);                     // wait for a second
  digitalWrite(LED_BUILTIN, LOW);  // turn the LED off by making the voltage LOW
}
