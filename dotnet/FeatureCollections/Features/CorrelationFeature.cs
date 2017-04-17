using System;

public class CorrelationFeature {    
    public Guid Id { get; private set; }

    public CorrelationFeature(Guid id){
        Id = id;
    }
}