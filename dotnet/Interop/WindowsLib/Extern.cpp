#include "stdafx.h"
#include "Calculator.h"


extern "C" {
  __declspec(dllexport) int Add(int a, int b) {
    Calculator calculator;
    return calculator.Add(a, b);
  }
}