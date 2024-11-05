import { QuestionTypesEnum } from "@/app/data/_enums/question.types.enum";
import { VideoTypesEnum } from "@/app/data/_enums/video.types.enum";
import { z } from "zod";


const videoLinkRegex = /^(https?:\/\/)?((www\.)?(youtube\.com|youtu\.?be)\/.+|(vimeo\.com)\/.+)$/;

export const contactUsformSchema = z.object({
    fullName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    emailId: z.string().email(),
    contactNumber: z.string().min(2, {
        message: "Phone must be at least 2 characters.",
    }),
    message: z.string().min(6, {
        message: "Message must be at least 6 characters.",
    }),


})

export const profileFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    userName: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }).max(16, {
        message: "Username must be at most 16 characters.",
    }).regex(/^[\w]+$/, {
        message: 'Username should not contain any special characters or non-printable characters.',
    }).refine(s => !s.includes(' '), 'Create a username without spaces.'),


    emailId: z.string().email(),
    contactNumber: z.string().min(2, {
        message: "Phone must be at least 2 characters.",
    }),

    password: z.string().refine(val => !val || val.length >= 6, {
        message: "Password must be at least 6 characters",
    }).optional(),

})


export const loginFormSchema = z.object({

    id: z.string().min(4, {
        message: "This must be at least 4 characters.",
    }).refine(s => !s.includes(' '), 'Enter details without spaces.'),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    remember: z.boolean().default(false).optional(),

})

export const signupFormSchema = z.object({

    emailId: z.string().email(),

    userName: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }).max(16, {
        message: "Username must be at most 16 characters.",
    }).regex(/^[\w]+$/, {
        message: 'Username should not contain any special characters or non-printable characters.',
    }).refine(s => !s.includes(' '), 'Create a username without spaces.'),


    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    agreeTerms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms & conditions" }),
    }),

})

export const createCourseDefaults = {
    titleMaxLength: 45,
    descriptionMaxLength: 230,
}


export const createCourseFormSchema = z.object({
    title: z.string().min(1, {
        message: `This must be 1 character minimum.`,
    }).max(createCourseDefaults?.titleMaxLength, {
        message: `This must be ${createCourseDefaults?.titleMaxLength} characters maximum.`,
    }),
    description: z.string().min(1, {
        message: `This must be 1 character minimum.`,
    }).max(createCourseDefaults?.descriptionMaxLength, {
        message: `This must be ${createCourseDefaults?.descriptionMaxLength} characters maximum.`,
    }),

    introVideoType: z.enum([VideoTypesEnum.LINK, VideoTypesEnum.UPLOAD], {
        message: `This must be either ${VideoTypesEnum.LINK} or ${VideoTypesEnum.UPLOAD}.`,
    }),

    introVideoLink: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.introVideoType === VideoTypesEnum.LINK) {

        if (!data.introVideoLink || !videoLinkRegex.test(data.introVideoLink)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['introVideoLink'],
                message: 'This must be a valid video URL (YouTube, Vimeo).',
            })

        }
    }


});

export const createModuleDefaults = {
    titleMaxLength: 45,
    descriptionMaxLength: 230,
    minDuration: 1,
}


export const createModuleFormSchema = z.object({
    title: z.string().min(1, {
        message: `This must be 1 character minimum.`,
    }).max(createModuleDefaults?.titleMaxLength, {
        message: `This must be ${createModuleDefaults?.titleMaxLength} characters maximum.`,
    }),
    description: z.string().min(1, {
        message: `This must be 1 character minimum.`,
    }).max(createModuleDefaults?.descriptionMaxLength, {
        message: `This must be ${createModuleDefaults?.descriptionMaxLength} characters maximum.`,
    }),
    introVideoType: z.enum([VideoTypesEnum.LINK, VideoTypesEnum.UPLOAD], {
        message: `This must be either ${VideoTypesEnum.LINK} or ${VideoTypesEnum.UPLOAD}.`,
    }).optional(),
    introVideoLink: z.string().optional(),
    durationInMin: z.string().optional().refine(value => !value || parseInt(value, 10) >= createModuleDefaults?.minDuration, {
        message: `If provided, the duration must be at least ${createModuleDefaults?.minDuration} minute.`,
    }),


}).superRefine((data, ctx) => {
    if (data.introVideoType === VideoTypesEnum.LINK) {
        if (!data.introVideoLink || !videoLinkRegex.test(data.introVideoLink)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['introVideoLink'],
                message: 'This must be a valid video URL (YouTube, Vimeo).',
            });
        }
    }


});

export const createQuizDefaults = {
    titleMaxLength: 45,
    descriptionMaxLength: 230,
    minDuration: 1,
    passPercentage: 1,
}


export const createQuizFormSchema = z.object({
    title: z.string().min(1, {
        message: `This must be 1 character minimum.`,
    }).max(createQuizDefaults?.titleMaxLength, {
        message: `This must be ${createQuizDefaults?.titleMaxLength} characters maximum.`,
    }),
    description: z.string().min(1, {
        message: `This must be 1 character minimum.`,
    }).max(createQuizDefaults?.descriptionMaxLength, {
        message: `This must be ${createQuizDefaults?.descriptionMaxLength} characters maximum.`,
    }),

    durationInMin: z.string().min(createQuizDefaults?.minDuration, {
        message: `The duration must be at least ${createQuizDefaults?.minDuration} minute.`,
    }),
    passPercentage: z.string().min(createQuizDefaults?.passPercentage, {
        message: `The passing percentage must be at least ${createQuizDefaults?.passPercentage}%`,
    })

});



export const createQuestionDefaults = {
    quizTitleMaxLength: 45,
    questionMaxLength: 330,
    optionMaxLength: 100,
    minOptionsLength: 2,
}


export const createQuestionFormSchema = z.object({
    question: z.string().min(1, {
        message: `This must be 1 character minimum.`,
    }).max(createQuestionDefaults?.questionMaxLength, {
        message: `This must be ${createQuestionDefaults?.questionMaxLength} characters maximum.`,
    }),
    score: z.string(),
    wrongScore: z.string(),
    type: z.enum([QuestionTypesEnum.MCQ, QuestionTypesEnum.MSQ], {
        message: `This must be either ${QuestionTypesEnum.MCQ} or ${QuestionTypesEnum.MSQ}.`,
    }),
    options: z.array(z.object({
        text: z.string().min(1, { message: "Option text is required" }).max(createQuestionDefaults?.optionMaxLength, { message: `Option text must be ${createQuestionDefaults?.optionMaxLength} characters maximum.` }),
        correct: z.boolean()
    })).min(createQuestionDefaults?.minOptionsLength, { message: `At least ${createQuestionDefaults?.minOptionsLength} options are required` }),
});


