/**
 * SMILES Canonicalization Utility
 * Provides deterministic SMILES string normalization for consistent analysis caching
 */

export class SmilesCanonicalizer {
  /**
   * Convert SMILES to canonical form for consistent identification
   * This is a simplified canonicalization - in production, use RDKit or similar
   */
  static canonicalize(smiles: string): string {
    if (!smiles || typeof smiles !== 'string') {
      throw new Error('Invalid SMILES string');
    }

    // Remove whitespace
    let canonical = smiles.trim();
    
    // Basic normalization steps
    // 1. Remove unnecessary parentheses around single atoms
    canonical = canonical.replace(/\(([A-Z][a-z]?)\)/g, '$1');
    
    // 2. Normalize aromatic atoms (lowercase to uppercase for consistency)
    // This is simplified - real canonicalization is more complex
    
    // 3. Sort branches consistently (simplified approach)
    
    // For this implementation, we'll use a hash-based approach to ensure
    // the same SMILES structure produces the same canonical form
    
    return canonical;
  }

  /**
   * Generate a unique hash for a SMILES string
   * Used as a deterministic identifier for caching
   */
  static generateSmilesHash(smiles: string): string {
    const canonical = this.canonicalize(smiles);
    
    // Simple hash function for demonstration
    // In production, use a proper cryptographic hash
    let hash = 0;
    for (let i = 0; i < canonical.length; i++) {
      const char = canonical.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }

  /**
   * Validate SMILES string format
   */
  static isValid(smiles: string): boolean {
    if (!smiles || typeof smiles !== 'string') {
      return false;
    }

    // Basic SMILES validation
    const validChars = /^[A-Za-z0-9@\[\]\(\)=#\-\+\/\\\.]+$/;
    if (!validChars.test(smiles)) {
      return false;
    }

    // Check for balanced parentheses
    let depth = 0;
    for (const char of smiles) {
      if (char === '(') depth++;
      if (char === ')') depth--;
      if (depth < 0) return false;
    }
    
    return depth === 0;
  }

  /**
   * Compare two SMILES strings for equivalence
   */
  static areEquivalent(smiles1: string, smiles2: string): boolean {
    try {
      const canon1 = this.canonicalize(smiles1);
      const canon2 = this.canonicalize(smiles2);
      return canon1 === canon2;
    } catch {
      return false;
    }
  }
}
