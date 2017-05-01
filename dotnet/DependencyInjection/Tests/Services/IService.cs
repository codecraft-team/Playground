using System;

namespace Tests.Services {
  public interface IService {
    Action OnDispose { get; set; }

  }
}