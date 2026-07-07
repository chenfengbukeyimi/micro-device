import { DomainEvent } from './domain-event';
import { UnifiedIdVO } from '../value-objects/index';

export abstract class AggregateRoot {
  protected domainEvents: DomainEvent[] = [];
  protected addDomainEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }
  protected getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }
  protected clearDomainEvents(): void {
    this.domainEvents.length = 0;
  }

  abstract equals(id: UnifiedIdVO): boolean;
}
