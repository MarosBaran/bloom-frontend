import { PartnerContent } from '../constants/partners';
import { PartnerAccess } from '../store/partnerAccessSlice';
import { PartnerAdmin } from '../store/partnerAdminSlice';
import {
  joinedPartners,
  joinedFeatureLiveChat,
  joinedFeatureTherapy,
  totalTherapyRemaining,
  totalTherapyRedeemed,
} from './formatPartnerAccesses';

const partnerAccessBase = {
  partner: {
    name: 'Bzzz',
  } as PartnerContent,
  featureLiveChat: true,
  featureTherapy: false,
  therapySessionsRemaining: 5,
  therapySessionsRedeemed: 2,
} as PartnerAccess;

const partnerAccess1 = {
  partner: {
    name: 'Moo',
  } as PartnerContent,
  featureLiveChat: false,
  featureTherapy: true,
  therapySessionsRemaining: 10,
  therapySessionsRedeemed: 3,
} as PartnerAccess;

const partnerAdmin = {
  partner: {
    name: 'Baa',
  } as PartnerContent,
} as PartnerAdmin;

describe('formatPartnerAccess', () => {
  describe('joinedPartners', () => {
    it('When one partner access code, should return correctly', () => {
      expect(joinedPartners([partnerAccessBase], undefined)).toBe('Bzzz');
    });
    it('When two partner access codes, should return correctly', () => {
      expect(joinedPartners([partnerAccessBase, partnerAccess1], undefined)).toBe('Bzzz, Moo');
    });
    it('When two partner access codes, should return correctly in alphabetical order', () => {
      expect(joinedPartners([partnerAccess1, partnerAccessBase], undefined)).toBe('Bzzz, Moo');
    });
    it('When partner access code and partner admin supplied, should return correctly in alphabetical order', () => {
      expect(joinedPartners([partnerAccess1, partnerAccessBase], partnerAdmin)).toBe('Baa, Bzzz, Moo');
    });
    it('When only partner admin is supplied, should return correctly', () => {
      expect(joinedPartners([], partnerAdmin)).toBe('Baa');
    });
  });

  describe('joinedFeatureLiveChat', () => {
    it('Should return partner names with live chat feature', () => {
      expect(joinedFeatureLiveChat([partnerAccessBase, partnerAccess1])).toBe('Bzzz');
    });
    it('Should return an empty string if no partners have live chat feature', () => {
      expect(joinedFeatureLiveChat([partnerAccess1])).toBe('');
    });
  });

  describe('joinedFeatureTherapy', () => {
    it('Should return partner names with therapy feature', () => {
      expect(joinedFeatureTherapy([partnerAccessBase, partnerAccess1])).toBe('Moo');
    });
    it('Should return an empty string if no partners have therapy feature', () => {
      expect(joinedFeatureTherapy([partnerAccessBase])).toBe('');
    });
  });
  describe('totalTherapyRemaining', () => {
    it('Should return total remaining therapy sessions', () => {
      expect(totalTherapyRemaining([partnerAccessBase, partnerAccess1])).toBe(15);
    });
    it('Should return null if no partner accesses are provided', () => {
      expect(totalTherapyRemaining(undefined)).toBe(null);
    });
  });

  describe('totalTherapyRedeemed', () => {
    it('Should return total redeemed therapy sessions', () => {
      expect(totalTherapyRedeemed([partnerAccessBase, partnerAccess1])).toBe(5);
    });
    it('Should return null if no partner accesses are provided', () => {
      expect(totalTherapyRedeemed(undefined)).toBe(null);
    });
  });
});
