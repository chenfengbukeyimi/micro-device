import { Cluster } from 'ioredis';
import { ClusterClientOption } from '../define/index';

export class ClusterService {
  constructor(
    private readonly client: Cluster,
    private readonly config: ClusterClientOption,
  ) {}
}
