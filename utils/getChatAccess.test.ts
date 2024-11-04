import { getChatAccess } from './getChatAccess';
import { PartnerAccesses } from '../store/partnerAccessSlice';
import { PartnerAdmin } from '../store/partnerAdminSlice';

describe('getChatAccess', () => {
  let setLiveChatAccess: jest.Mock;

  beforeEach(() => {
    setLiveChatAccess = jest.fn();
  });

  it('should set live chat access to true if there is a partner with live chat feature', () => {
    const partnerAccesses = [
      { featureLiveChat: true },
    ] as PartnerAccesses;
    const partnerAdmin = { id: 'admin1' } as PartnerAdmin;

    getChatAccess(partnerAccesses, setLiveChatAccess, partnerAdmin);

    expect(setLiveChatAccess).toHaveBeenCalledWith(true);
  });

  it('should set live chat access to true if partnerAccesses is empty and partnerAdmin has no id', () => {
    const partnerAccesses: PartnerAccesses = [];
    const partnerAdmin = {} as PartnerAdmin;

    getChatAccess(partnerAccesses, setLiveChatAccess, partnerAdmin);

    expect(setLiveChatAccess).toHaveBeenCalledWith(true);
  });

  it('should not set live chat access if there is no live chat access and partnerAdmin has an id', () => {
    const partnerAccesses = [
      { featureLiveChat: false },
    ] as PartnerAccesses;
    const partnerAdmin = { id: 'admin1' } as PartnerAdmin;

    getChatAccess(partnerAccesses, setLiveChatAccess, partnerAdmin);

    expect(setLiveChatAccess).not.toHaveBeenCalled();
  });

  it('should not set live chat access if partnerAccesses is empty but partnerAdmin has an id', () => {
    const partnerAccesses: PartnerAccesses = [];
    const partnerAdmin = { id: 'admin1' } as PartnerAdmin;

    getChatAccess(partnerAccesses, setLiveChatAccess, partnerAdmin);

    expect(setLiveChatAccess).not.toHaveBeenCalled();
  });
});
