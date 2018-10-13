#include "Calculator.h"

extern "C" {
  int Add(int a, int b) {
    Calculator calculator;
    return calculator.Add(a, b);
  }
}
