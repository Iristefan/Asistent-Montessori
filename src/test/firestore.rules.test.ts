/**
 * Firestore Rules Verification Test Suite
 * Validates Security Boundaries and Access Controls
 */

export const DIRTY_DOZEN_TEST_SCENARIOS = [
  {
    name: 'Unauthenticated Read on /users/user123',
    auth: null,
    operation: 'get',
    path: '/users/user123',
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'Unauthenticated Write on /users/user123',
    auth: null,
    operation: 'create',
    path: '/users/user123',
    data: { uid: 'user123', email: 'test@example.com', role: 'client', status: 'active' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'Identity Spoofing: UID mismatch in incoming document',
    auth: { uid: 'attacker_uid' },
    operation: 'create',
    path: '/users/victim_uid',
    data: { uid: 'victim_uid', email: 'victim@example.com', role: 'client', status: 'active' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'Privilege Escalation: Non-admin assigning admin role',
    auth: { uid: 'regular_user', email: 'regular@example.com' },
    operation: 'create',
    path: '/users/regular_user',
    data: { uid: 'regular_user', email: 'regular@example.com', role: 'admin', status: 'active' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'ID Poisoning with malicious characters',
    auth: { uid: 'bad..path/injection' },
    operation: 'create',
    path: '/users/bad..path/injection',
    data: { uid: 'bad..path/injection', email: 'bad@example.com', role: 'client', status: 'active' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'Denial of Wallet: Excessive string payload',
    auth: { uid: 'spammer' },
    operation: 'create',
    path: '/users/spammer',
    data: { uid: 'spammer', email: 'a'.repeat(300) + '@example.com', role: 'client', status: 'active' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'Shadow Field Injection',
    auth: { uid: 'infiltrator' },
    operation: 'create',
    path: '/users/infiltrator',
    data: { uid: 'infiltrator', email: 'inf@test.com', role: 'client', status: 'active', ghostField: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'Owner ID Mutation on update',
    auth: { uid: 'user_a' },
    operation: 'update',
    path: '/users/user_a',
    existing: { uid: 'user_a', email: 'a@test.com', role: 'client', status: 'active' },
    data: { uid: 'user_b', email: 'a@test.com', role: 'client', status: 'active' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'Status Elevation without privilege',
    auth: { uid: 'client_1' },
    operation: 'update',
    path: '/users/client_1',
    existing: { uid: 'client_1', email: 'c@test.com', role: 'client', status: 'pending' },
    data: { uid: 'client_1', email: 'c@test.com', role: 'client', status: 'active' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'Cross-Tenant Read: Client A reading Client B profile',
    auth: { uid: 'client_a', email: 'a@test.com' },
    operation: 'get',
    path: '/users/client_b',
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'Unbounded Collection List Query',
    auth: { uid: 'client_a' },
    operation: 'list',
    path: '/users',
    query: { where: [] },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: 'Admin Write Protection: Non-admin writing to /admins/',
    auth: { uid: 'rogue_user', email: 'rogue@test.com' },
    operation: 'create',
    path: '/admins/rogue_user',
    data: { role: 'admin' },
    expected: 'PERMISSION_DENIED',
  }
];
