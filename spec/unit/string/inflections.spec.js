describe 'String inflections'
  describe '#singular & #plural'
    before
      testStrings = [
        'person','man','woman','child','sex','move','Person','Man','Woman','Child',
        'Sex','Move','equipment','information','rice','money','species','series',
        'fish','sheep','deer','Equipment','Information','Rice','Money','Species',
        'Series','Fish','Sheep','Deer','octopus','wolf','potato','fool','blue',
        'bus','student','tuna','Octopus','Wolf','Potato','Fool','Blue','Bus',
        'Student','Tuna','news','News','mouse','Mouse','information','Information',
        'ox','Ox','virus','Virus','archive','Archive','louse','Louse','curve','Curve'
      ]
    end

    it 'should singularize and pluralize given strings'
      for (var i = 0; i < testStrings.length; i++) {
        (testStrings[i].plural.singular == testStrings[i]).should.be_true
      }
    end
  end
end
