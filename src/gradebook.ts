export class Gradebook {

    readonly DEFAULT_GRADE = 'D';
    readonly GRADES = new Map<number, string>([
        [70, 'C'],
        [80, 'B'],
        [90, 'A']
    ])

    public calculateGrade(score: number): string {
        return this.getGradeFromMapByScore(this.GRADES, score);
    }

    private getGradeFromMapByScore(grades: Map<number, string>, score: number) {
        let result: string = this.DEFAULT_GRADE;

        for (let key of grades.keys()) {
            result = this.isAGreaterThenEqualB(score, key) ? grades.get(key)! : result;
        }

        return result;
    }

    private isAGreaterThenEqualB(a: number, b: number) {
        return a >= b;
    }
}