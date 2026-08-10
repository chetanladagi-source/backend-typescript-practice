abstract class Employee {
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  
    abstract work(): void;
  }
  
  class Developer extends Employee {
    work(): void {
      console.log(`${this.name} writes code`);
    }
  }
  
  class Manager extends Employee {
    work(): void {
      console.log(`${this.name} manages the team`);
    }
  }
  
  const developer = new Developer("Chetan");
  const manager = new Manager("Rahul");
  
  developer.work();
  manager.work();