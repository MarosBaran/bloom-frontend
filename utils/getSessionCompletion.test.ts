import { getSessionCompletion } from './getSessionCompletion';
import { Courses, Session } from '../store/coursesSlice';
import { PROGRESS_STATUS } from '../constants/enums';
import { ISbStoryData } from '@storyblok/react';
import { ISbComponentType } from 'storyblok-js-client';

describe('getSessionCompletion', () => {
  let setWeekString: jest.Mock;
  let setSessionProgress: jest.Mock;

  beforeEach(() => {
    setWeekString = jest.fn();
    setSessionProgress = jest.fn();
  });

  const createCourse = (weekSessions: string[], id = 1) => ({
    content: {
      weeks: [
        {
          name: 'Week 1',
          sessions: weekSessions,
        },
      ],
    },
    id,
  }) as unknown as ISbStoryData<ISbComponentType<string> & { [key: string]: any }>;

  const createCourses = (sessionId: string, completed: boolean, courseId = '1'): Courses => [
    {
      storyblokId: courseId,
      sessions: [
        { storyblokId: sessionId, completed } as unknown as Session,
      ],
    },
  ] as unknown as Courses;

  it('should set week name if session matches storyUuid', () => {
    const course = createCourse(['uuid-1', 'uuid-2']);
    const courses: Courses = [];
    const storyUuid = 'uuid-1';
    const storyId = 123;

    getSessionCompletion(course, courses, storyUuid, storyId, setWeekString, setSessionProgress);

    expect(setWeekString).toHaveBeenCalledWith('Week 1');
  });

  it('should set session progress to COMPLETED if user session is completed', () => {
    const course = createCourse(['uuid-1', 'uuid-2']);
    const courses = createCourses('123', true);
    const storyUuid = 'uuid-1';
    const storyId = 123;

    getSessionCompletion(course, courses, storyUuid, storyId, setWeekString, setSessionProgress);

    expect(setSessionProgress).toHaveBeenCalledWith(PROGRESS_STATUS.COMPLETED);
  });

  it('should set session progress to STARTED if user session is not completed', () => {
    const course = createCourse(['uuid-1', 'uuid-2']);
    const courses = createCourses('123', false);
    const storyUuid = 'uuid-1';
    const storyId = 123;

    getSessionCompletion(course, courses, storyUuid, storyId, setWeekString, setSessionProgress);

    expect(setSessionProgress).toHaveBeenCalledWith(PROGRESS_STATUS.STARTED);
  });

  it('should not set session progress if course is not found in user courses', () => {
    const course = createCourse(['uuid-1', 'uuid-2'], 2);
    const courses = createCourses('123', false);
    const storyUuid = 'uuid-1';
    const storyId = 123;

    getSessionCompletion(course, courses, storyUuid, storyId, setWeekString, setSessionProgress);

    expect(setSessionProgress).not.toHaveBeenCalled();
  });

  it('should not set week name if session does not match storyUuid', () => {
    const course = createCourse(['uuid-3', 'uuid-4']);
    const courses: Courses = [];
    const storyUuid = 'uuid-1';
    const storyId = 123;

    getSessionCompletion(course, courses, storyUuid, storyId, setWeekString, setSessionProgress);

    expect(setWeekString).not.toHaveBeenCalled();
  });
});
