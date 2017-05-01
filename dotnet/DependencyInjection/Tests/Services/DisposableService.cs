using System;

namespace Tests.Services {
  public class DisposableService : IService, IDisposable {
    public bool Disposed { get; set; }

    public Action OnDispose { get; set; }

    public void Dispose() {
      if (Disposed) {
        throw new ObjectDisposedException(nameof(DisposableService));
      }

      Console.WriteLine("Disposed.");

      OnDispose?.Invoke();

      Disposed = true;
    }
  }
}