import React, { useState } from 'react';

import { User, GraduationCap, BookOpen, Plus, Trash2, Eye, Users, Code, Database } from 'lucide-react';

// Base Person class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    displayInfo() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }

    introduce() {
        return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
    }

    getType() {
        return 'Person';
    }
}

// Student subclass extending Person
class Student extends Person {
    constructor(name, age, grade, course) {
        super(name, age);
        this.grade = grade;
        this.course = course;
    }

    displayInfo() {
        return `${super.displayInfo()}, Grade: ${this.grade}, Course: ${this.course}`;
    }

    introduce() {
        return `${super.introduce()} I'm a student in grade ${this.grade}, studying ${this.course}.`;
    }

    getType() {
        return 'Student';
    }

    study() {
        return `${this.name} is studying ${this.course}.`;
    }

    takeExam(subject) {
        return `${this.name} is taking an exam in ${subject}.`;
    }
}

// Teacher subclass extending Person
class Teacher extends Person {
    constructor(name, age, subject, department) {
        super(name, age);
        this.subject = subject;
        this.department = department;
    }

    displayInfo() {
        return `${super.displayInfo()}, Subject: ${this.subject}, Department: ${this.department}`;
    }

    introduce() {
        return `${super.introduce()} I'm a teacher in the ${this.department} department, teaching ${this.subject}.`;
    }

    getType() {
        return 'Teacher';
    }

    teach() {
        return `${this.name} is teaching ${this.subject}.`;
    }

    gradeAssignment(studentName, grade) {
        return `${this.name} gave ${studentName} a grade of ${grade} in ${this.subject}.`;
    }
}

const PersonHierarchyUI = () => {
    const [people, setPeople] = useState([
        new Person("John Doe", 35),
        new Student("Alice Johnson", 20, "Junior", "Computer Science"),
        new Teacher("Dr. Smith", 45, "Mathematics", "Science Department")
    ]);

    const [selectedPerson, setSelectedPerson] = useState(null);
    const [newPersonType, setNewPersonType] = useState('Person');
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        grade: '',
        course: '',
        subject: '',
        department: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addPerson = () => {
        if (!formData.name || !formData.age) return;

        let newPerson;
        const id = Date.now();

        switch (newPersonType) {
            case 'Student':
                if (!formData.grade || !formData.course) return;
                newPerson = new Student(formData.name, parseInt(formData.age), formData.grade, formData.course);
                break;
            case 'Teacher':
                if (!formData.subject || !formData.department) return;
                newPerson = new Teacher(formData.name, parseInt(formData.age), formData.subject, formData.department);
                break;
            default:
                newPerson = new Person(formData.name, parseInt(formData.age));
        }

        newPerson.id = id;
        setPeople([...people, newPerson]);
        setFormData({ name: '', age: '', grade: '', course: '', subject: '', department: '' });
    };

    const removePerson = (id) => {
        setPeople(people.filter(person => person.id !== id));
        if (selectedPerson && selectedPerson.id === id) {
            setSelectedPerson(null);
        }
    };

    const getPersonIcon = (type) => {
        switch (type) {
            case 'Student': return <GraduationCap style={{color: '#3b82f6'}} size={20} />;
            case 'Teacher': return <BookOpen style={{color: '#10b981'}} size={20} />;
            default: return <User style={{color: '#64748b'}} size={20} />;
        }
    };

    // Inline styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%, #eff6ff 100%)',
            padding: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        maxWidth: {
            maxWidth: '1400px',
            margin: '0 auto'
        },
        header: {
            textAlign: 'center',
            marginBottom: '48px'
        },
        headerIcon: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #3b82f6, #10b981)',
            borderRadius: '16px',
            marginBottom: '24px',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
            color: 'white'
        },
        mainTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #1e293b, #3b82f6, #10b981)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
        },
        description: {
            fontSize: '1.125rem',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7'
        },
        mainGrid: {
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 1200 ? '1fr 1fr' : '1fr',
            gap: '32px',
            marginBottom: '32px'
        },
        card: {
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
        },
        cardHeader: {
            background: 'linear-gradient(135deg, #f8fafc, #eff6ff)',
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        panelIcon: {
            padding: '8px',
            background: '#3b82f6',
            borderRadius: '8px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        panelTitle: {
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1e293b',
            flex: '1'
        },
        badge: {
            background: '#dbeafe',
            color: '#1d4ed8',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '500'
        },
        cardContent: {
            padding: '24px'
        },
        form: {
            background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid #e2e8f0'
        },
        formTitle: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '16px'
        },
        formGroup: {
            marginBottom: '16px'
        },
        label: {
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '4px'
        },
        input: {
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.875rem',
            background: 'white',
            outline: 'none'
        },
        formRow: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
        },
        addButton: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        personCard: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            marginBottom: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: 'white'
        },
        personCardHover: {
            borderColor: '#3b82f6',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
            transform: 'translateY(-1px)'
        },
        personInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        iconContainer: {
            padding: '8px',
            background: '#f8fafc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        personName: {
            fontWeight: '600',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        typeBadge: {
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '500'
        },
        studentBadge: {
            background: '#dbeafe',
            color: '#1d4ed8',
            border: '1px solid #bfdbfe'
        },
        teacherBadge: {
            background: '#d1fae5',
            color: '#065f46',
            border: '1px solid #a7f3d0'
        },
        personBadge: {
            background: '#f1f5f9',
            color: '#475569',
            border: '1px solid #e2e8f0'
        },
        personMeta: {
            fontSize: '0.875rem',
            color: '#64748b',
            marginTop: '4px'
        },
        actions: {
            display: 'flex',
            gap: '8px',
            opacity: '0',
            transition: 'opacity 0.2s ease'
        },
        actionButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        viewButton: {
            background: '#64748b',
            color: 'white'
        },
        removeButton: {
            background: '#ef4444',
            color: 'white'
        },
        emptyState: {
            textAlign: 'center',
            padding: '48px 24px',
            color: '#64748b'
        },
        selectedPerson: {
            animation: 'fadeIn 0.3s ease'
        },
        personHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
            borderRadius: '12px',
            marginBottom: '24px'
        },
        avatar: {
            padding: '12px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        },
        selectedName: {
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1e293b'
        },
        instanceBadge: {
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '0.875rem',
            fontWeight: '500',
            border: '1px solid',
            marginTop: '4px',
            display: 'inline-block'
        },
        methodSection: {
            background: '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            marginBottom: '16px'
        },
        methodTitle: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.875rem',
            fontWeight: '700',
            color: '#374151',
            marginBottom: '12px'
        },
        codeOutput: {
            background: '#1e293b',
            color: '#10b981',
            padding: '16px',
            borderRadius: '8px',
            fontFamily: 'Monaco, "Cascadia Code", monospace',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            overflowX: 'auto'
        },
        specificMethods: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        specificMethod: {
            background: 'white',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
        },
        methodName: {
            fontSize: '0.75rem',
            fontWeight: '500',
            marginBottom: '8px'
        },
        studentSection: {
            background: '#eff6ff',
            borderColor: '#bfdbfe'
        },
        teacherSection: {
            background: '#ecfdf5',
            borderColor: '#a7f3d0'
        },
        studentTitle: {
            color: '#1d4ed8'
        },
        teacherTitle: {
            color: '#065f46'
        },
        studentCode: {
            background: '#1e40af',
            color: 'white'
        },
        teacherCode: {
            background: '#065f46',
            color: 'white'
        },
        inheritanceSection: {
            background: '#faf5ff',
            borderColor: '#d8b4fe'
        },
        inheritanceTitle: {
            color: '#7c3aed'
        },
        inheritanceChecks: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        inheritanceCheck: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white',
            padding: '12px',
            borderRadius: '8px'
        },
        checkLabel: {
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#7c3aed'
        },
        checkResult: {
            padding: '4px 8px',
            borderRadius: '16px',
            fontSize: '0.75rem',
            fontWeight: '700'
        },
        trueResult: {
            background: '#dcfce7',
            color: '#166534'
        },
        falseResult: {
            background: '#fee2e2',
            color: '#dc2626'
        },
        hierarchySection: {
            marginTop: '32px'
        },
        hierarchyContent: {
            padding: '32px'
        },
        hierarchyDiagram: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        classBox: {
            background: 'white',
            border: '2px solid',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            minWidth: '200px'
        },
        parentClass: {
            borderColor: '#64748b',
            background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
            marginBottom: '32px'
        },
        className: {
            fontSize: '1.125rem',
            fontWeight: '700',
            margin: '12px 0 8px 0'
        },
        classType: {
            fontSize: '0.875rem',
            padding: '4px 12px',
            borderRadius: '16px',
            display: 'inline-block',
            marginBottom: '12px'
        },
        baseType: {
            background: '#f1f5f9',
            color: '#475569'
        },
        studentType: {
            background: '#dbeafe',
            color: '#1d4ed8'
        },
        teacherType: {
            background: '#d1fae5',
            color: '#065f46'
        },
        classProperties: {
            fontSize: '0.75rem',
            color: '#64748b',
            lineHeight: '1.5'
        },
        inheritanceLines: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '32px'
        },
        inheritanceLineContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
        },
        inheritanceLine: {
            width: '128px',
            height: '2px',
            background: '#d1d5db'
        },
        inheritanceDot: {
            width: '12px',
            height: '12px',
            background: '#64748b',
            borderRadius: '50%'
        },
        childClasses: {
            display: 'flex',
            justifyContent: 'center',
            gap: '48px'
        },
        childClassContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        verticalLine: {
            width: '2px',
            height: '48px',
            background: '#d1d5db',
            marginBottom: '16px'
        },
        studentClass: {
            borderColor: '#3b82f6',
            background: 'linear-gradient(135deg, #eff6ff, #dbeafe)'
        },
        teacherClass: {
            borderColor: '#10b981',
            background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.maxWidth}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerIcon}>
                        <Code size={32} />
                    </div>
                    <h1 style={styles.mainTitle}>
                        Person Class Hierarchy Demo
                    </h1>
                    <p style={styles.description}>
                        Interactive demonstration of <span style={{fontWeight: '600', color: '#3b82f6'}}>inheritance</span>, 
                        <span style={{fontWeight: '600', color: '#10b981'}}> polymorphism</span>, and 
                        <span style={{fontWeight: '600', color: '#8b5cf6'}}> method overriding</span> in JavaScript ES6 classes
                    </p>
                </div>

                <div style={styles.mainGrid}>
                    {/* Left Panel - People List */}
                    <div>
                        <div style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={styles.panelIcon}>
                                    <Users size={20} />
                                </div>
                                <h2 style={styles.panelTitle}>People Registry</h2>
                                <span style={styles.badge}>
                                    {people.length} {people.length === 1 ? 'person' : 'people'}
                                </span>
                            </div>
                            
                            <div style={styles.cardContent}>
                                {/* Add Person Form */}
                                <div style={styles.form}>
                                    <h3 style={styles.formTitle}>
                                        <Plus size={16} />
                                        Add New Person
                                    </h3>
                                    
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Person Type</label>
                                        <select 
                                            value={newPersonType}
                                            onChange={(e) => setNewPersonType(e.target.value)}
                                            style={styles.input}
                                        >
                                            <option value="Person">👤 Person</option>
                                            <option value="Student">🎓 Student</option>
                                            <option value="Teacher">📚 Teacher</option>
                                        </select>
                                    </div>
                                    
                                    <div style={styles.formRow}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter full name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                style={styles.input}
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Age</label>
                                            <input
                                                type="number"
                                                placeholder="Enter age"
                                                value={formData.age}
                                                onChange={(e) => handleInputChange('age', e.target.value)}
                                                style={styles.input}
                                            />
                                        </div>
                                    </div>

                                    {newPersonType === 'Student' && (
                                        <div style={styles.formRow}>
                                            <div style={styles.formGroup}>
                                                <label style={{...styles.label, color: '#1d4ed8'}}>Grade</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g., Junior, Senior"
                                                    value={formData.grade}
                                                    onChange={(e) => handleInputChange('grade', e.target.value)}
                                                    style={{...styles.input, borderColor: '#bfdbfe'}}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <label style={{...styles.label, color: '#1d4ed8'}}>Course</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g., Computer Science"
                                                    value={formData.course}
                                                    onChange={(e) => handleInputChange('course', e.target.value)}
                                                    style={{...styles.input, borderColor: '#bfdbfe'}}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {newPersonType === 'Teacher' && (
                                        <div style={styles.formRow}>
                                            <div style={styles.formGroup}>
                                                <label style={{...styles.label, color: '#065f46'}}>Subject</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g., Mathematics"
                                                    value={formData.subject}
                                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                                    style={{...styles.input, borderColor: '#a7f3d0'}}
                                                />
                                            </div>
                                            <div style={styles.formGroup}>
                                                <label style={{...styles.label, color: '#065f46'}}>Department</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g., Science Department"
                                                    value={formData.department}
                                                    onChange={(e) => handleInputChange('department', e.target.value)}
                                                    style={{...styles.input, borderColor: '#a7f3d0'}}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={addPerson}
                                        style={styles.addButton}
                                        onMouseOver={(e) => {
                                            e.target.style.transform = 'translateY(-1px)';
                                            e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        <Plus size={18} />
                                        Add {newPersonType}
                                    </button>
                                </div>

                                {/* People List */}
                                <div>
                                    {people.map((person, index) => (
                                        <div
                                            key={person.id || index}
                                            style={{
                                                ...styles.personCard,
                                                ...(selectedPerson === person ? {
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
                                                    transform: 'translateY(-1px)'
                                                } : {})
                                            }}
                                            onClick={() => setSelectedPerson(person)}
                                            onMouseOver={(e) => {
                                                const actions = e.currentTarget.querySelector('.actions');
                                                if (actions) actions.style.opacity = '1';
                                            }}
                                            onMouseOut={(e) => {
                                                const actions = e.currentTarget.querySelector('.actions');
                                                if (actions) actions.style.opacity = '0';
                                            }}
                                        >
                                            <div style={styles.personInfo}>
                                                <div style={styles.iconContainer}>
                                                    {getPersonIcon(person.getType())}
                                                </div>
                                                <div>
                                                    <div style={styles.personName}>
                                                        {person.name}
                                                        <span style={{
                                                            ...styles.typeBadge,
                                                            ...(person.getType() === 'Student' ? styles.studentBadge :
                                                                person.getType() === 'Teacher' ? styles.teacherBadge :
                                                                styles.personBadge)
                                                        }}>
                                                            {person.getType()}
                                                        </span>
                                                    </div>
                                                    <div style={styles.personMeta}>
                                                        Age {person.age}
                                                        {person.course && ` • ${person.course}`}
                                                        {person.subject && ` • ${person.subject}`}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="actions" style={styles.actions}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedPerson(person);
                                                    }}
                                                    style={{...styles.actionButton, ...styles.viewButton}}
                                                >
                                                    <Eye size={12} />
                                                    View
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removePerson(person.id || index);
                                                    }}
                                                    style={{...styles.actionButton, ...styles.removeButton}}
                                                >
                                                    <Trash2 size={12} />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {people.length === 0 && (
                                        <div style={styles.emptyState}>
                                            <Users size={48} />
                                            <p style={{fontWeight: '500', marginTop: '16px'}}>No people added yet</p>
                                            <p style={{fontSize: '0.875rem'}}>Add your first person using the form above</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Selected Person Details */}
                    <div>
                        <div style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={{...styles.panelIcon, background: '#8b5cf6'}}>
                                    <Database size={20} />
                                </div>
                                <h2 style={styles.panelTitle}>Object Details & Methods</h2>
                            </div>

                            <div style={styles.cardContent}>
                                {selectedPerson ? (
                                    <div style={styles.selectedPerson}>
                                        <div style={styles.personHeader}>
                                            <div style={styles.avatar}>
                                                {getPersonIcon(selectedPerson.getType())}
                                            </div>
                                            <div>
                                                <h3 style={styles.selectedName}>
                                                    {selectedPerson.name}
                                                </h3>
                                                <span style={{
                                                    ...styles.instanceBadge,
                                                    ...(selectedPerson.getType() === 'Student' ? styles.studentBadge :
                                                        selectedPerson.getType() === 'Teacher' ? styles.teacherBadge :
                                                        styles.personBadge)
                                                }}>
                                                    {selectedPerson.getType()} Instance
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            {/* Methods Display */}
                                            <div style={styles.methodSection}>
                                                <h4 style={styles.methodTitle}>
                                                    <Code size={16} />
                                                    displayInfo() Method:
                                                </h4>
                                                <div style={styles.codeOutput}>
                                                    {selectedPerson.displayInfo()}
                                                </div>
                                            </div>

                                            <div style={styles.methodSection}>
                                                <h4 style={styles.methodTitle}>
                                                    <Code size={16} />
                                                    introduce() Method:
                                                </h4>
                                                <div style={styles.codeOutput}>
                                                    "{selectedPerson.introduce()}"
                                                </div>
                                            </div>

                                            {/* Specific Methods */}
                                            {selectedPerson instanceof Student && (
                                                <div style={{...styles.methodSection, ...styles.studentSection}}>
                                                    <h4 style={{...styles.methodTitle, ...styles.studentTitle}}>
                                                        <GraduationCap size={16} />
                                                        Student-Specific Methods:
                                                    </h4>
                                                    <div style={styles.specificMethods}>
                                                        <div style={styles.specificMethod}>
                                                            <div style={{...styles.methodName, color: '#1d4ed8'}}>study() Method:</div>
                                                            <div style={styles.studentCode}>
                                                                {selectedPerson.study()}
                                                            </div>
                                                        </div>
                                                        <div style={styles.specificMethod}>
                                                            <div style={{...styles.methodName, color: '#1d4ed8'}}>takeExam(subject) Method:</div>
                                                            <div style={styles.studentCode}>
                                                                {selectedPerson.takeExam("JavaScript")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {selectedPerson instanceof Teacher && (
                                                <div style={{...styles.methodSection, ...styles.teacherSection}}>
                                                    <h4 style={{...styles.methodTitle, ...styles.teacherTitle}}>
                                                        <BookOpen size={16} />
                                                        Teacher-Specific Methods:
                                                    </h4>
                                                    <div style={styles.specificMethods}>
                                                        <div style={styles.specificMethod}>
                                                            <div style={{...styles.methodName, color: '#065f46'}}>teach() Method:</div>
                                                            <div style={styles.teacherCode}>
                                                                {selectedPerson.teach()}
                                                            </div>
                                                        </div>
                                                        <div style={styles.specificMethod}>
                                                            <div style={{...styles.methodName, color: '#065f46'}}>gradeAssignment(student, grade) Method:</div>
                                                            <div style={styles.teacherCode}>
                                                                {selectedPerson.gradeAssignment("Student", "A+")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Inheritance Check */}
                                            <div style={{...styles.methodSection, ...styles.inheritanceSection}}>
                                                <h4 style={{...styles.methodTitle, ...styles.inheritanceTitle}}>
                                                    🔗 Inheritance Chain:
                                                </h4>
                                                <div style={styles.inheritanceChecks}>
                                                    <div style={styles.inheritanceCheck}>
                                                        <span style={styles.checkLabel}>instanceof Person:</span>
                                                        <span style={{
                                                            ...styles.checkResult,
                                                            ...(selectedPerson instanceof Person ? styles.trueResult : styles.falseResult)
                                                        }}>
                                                            {String(selectedPerson instanceof Person)}
                                                        </span>
                                                    </div>
                                                    <div style={styles.inheritanceCheck}>
                                                        <span style={styles.checkLabel}>instanceof Student:</span>
                                                        <span style={{
                                                            ...styles.checkResult,
                                                            ...(selectedPerson instanceof Student ? styles.trueResult : styles.falseResult)
                                                        }}>
                                                            {String(selectedPerson instanceof Student)}
                                                        </span>
                                                    </div>
                                                    <div style={styles.inheritanceCheck}>
                                                        <span style={styles.checkLabel}>instanceof Teacher:</span>
                                                        <span style={{
                                                            ...styles.checkResult,
                                                            ...(selectedPerson instanceof Teacher ? styles.trueResult : styles.falseResult)
                                                        }}>
                                                            {String(selectedPerson instanceof Teacher)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={styles.emptyState}>
                                        <User size={64} />
                                        <p style={{fontSize: '1.125rem', fontWeight: '500', marginTop: '16px'}}>Select a person to explore</p>
                                        <p style={{fontSize: '0.875rem'}}>Click on any person from the list to view their details, methods, and inheritance chain</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Class Hierarchy Diagram */}
                <div style={styles.hierarchySection}>
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={{...styles.panelIcon, background: '#6366f1'}}>
                                <Database size={20} />
                            </div>
                            <h2 style={styles.panelTitle}>Class Hierarchy Diagram</h2>
                        </div>
                        
                        <div style={styles.hierarchyContent}>
                            <div style={styles.hierarchyDiagram}>
                                {/* Parent Class */}
                                <div style={{...styles.classBox, ...styles.parentClass}}>
                                    <User size={40} style={{color: '#64748b'}} />
                                    <div style={{...styles.className, color: '#475569'}}>Person</div>
                                    <div style={{...styles.classType, ...styles.baseType}}>Base Class</div>
                                    <div style={styles.classProperties}>
                                        <div>• name: string</div>
                                        <div>• age: number</div>
                                        <div>• displayInfo()</div>
                                        <div>• introduce()</div>
                                    </div>
                                </div>
                                
                                {/* Inheritance Lines */}
                                <div style={styles.inheritanceLines}>
                                    <div style={styles.inheritanceLineContainer}>
                                        <div style={styles.inheritanceLine}></div>
                                        <div style={styles.inheritanceDot}></div>
                                        <div style={styles.inheritanceLine}></div>
                                    </div>
                                </div>
                                
                                {/* Child Classes */}
                                <div style={styles.childClasses}>
                                    {/* Student Class */}
                                    <div style={styles.childClassContainer}>
                                        <div style={styles.verticalLine}></div>
                                        <div style={{...styles.classBox, ...styles.studentClass}}>
                                            <GraduationCap size={40} style={{color: '#3b82f6'}} />
                                            <div style={{...styles.className, color: '#1d4ed8'}}>Student</div>
                                            <div style={{...styles.classType, ...styles.studentType}}>Extends Person</div>
                                            <div style={styles.classProperties}>
                                                <div>+ grade: string</div>
                                                <div>+ course: string</div>
                                                <div>+ study()</div>
                                                <div>+ takeExam()</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Teacher Class */}
                                    <div style={styles.childClassContainer}>
                                        <div style={styles.verticalLine}></div>
                                        <div style={{...styles.classBox, ...styles.teacherClass}}>
                                            <BookOpen size={40} style={{color: '#10b981'}} />
                                            <div style={{...styles.className, color: '#065f46'}}>Teacher</div>
                                            <div style={{...styles.classType, ...styles.teacherType}}>Extends Person</div>
                                            <div style={styles.classProperties}>
                                                <div>+ subject: string</div>
                                                <div>+ department: string</div>
                                                <div>+ teach()</div>
                                                <div>+ gradeAssignment()</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonHierarchyUI;