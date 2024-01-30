export class CourseStatistic {

    constructor(
        private courseName: string,
        private totalLectures: number,
        private lecturesCompleted: number,
        private progress: number,
        private lastAccessed: Date
    ) { }
    
}